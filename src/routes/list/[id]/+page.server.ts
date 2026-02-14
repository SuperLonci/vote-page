import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { bets, answers } from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const betId = params.id;

	// 1. Fetch the bet details
	const bet = await db.query.bets.findFirst({
		where: eq(bets.id, betId)
	});

	if (!bet) throw error(404, 'Bet not found');

	// 2. Fetch all existing answers
	const existingAnswers = await db.query.answers.findMany({
		where: eq(answers.betId, betId),
		orderBy: (answers, { desc }) => [desc(answers.createdAt)]
	});

	// 3. Check if user has already answered this specific bet via cookie
	const cookieName = `voted_${betId}`;
	const hasAnswered = cookies.get(cookieName) === 'true';

	// 4. Determine if the bet is in read-only mode or resolve date has passed
	const now = new Date();
	const isReadOnly = now > bet.resolveDate || 
		(bet.endOfEntryEnabled && bet.endOfEntryDate && now > bet.endOfEntryDate);
	const isResolved = now > bet.resolveDate;

	// 5. Show answers if user answered or if resolve date has passed
	const safeAnswers = (hasAnswered || isResolved) 
		? existingAnswers 
		: existingAnswers.map(a => ({ ...a, value: 'HIDDEN' }));

	// 6. Determine if the win item should be shown
	const shouldShowWin = bet.canBeWon && (!bet.isWinSecret || isResolved);

	return {
		bet,
		answers: safeAnswers,
		hasAnswered,
		isReadOnly,
		shouldShowWin
	};
};

export const actions = {
	submitAnswer: async ({ request, params, cookies }) => {
		const data = await request.formData();
		const userName = data.get('userName') as string;
		const value = data.get('value') as string;
		const betId = params.id;

		if (!userName || !value) return fail(400, { missing: true });

		// Check if user has already voted (prevent re-voting via back button)
		const cookieName = `voted_${betId}`;
		if (cookies.get(cookieName) === 'true') {
			return fail(400, { alreadyVoted: true });
		}

		// Check if bet is in read-only mode
		const bet = await db.query.bets.findFirst({
			where: eq(bets.id, betId)
		});

		if (!bet) return fail(404, { notFound: true });

		const now = new Date();
		const isReadOnly = now > bet.resolveDate || 
			(bet.endOfEntryEnabled && bet.endOfEntryDate && now > bet.endOfEntryDate);

		if (isReadOnly) {
			return fail(403, { readOnly: true });
		}

		// Save answer to DB
		await db.insert(answers).values({
			betId,
			userName,
			value
		});

		// Set a cookie so the user can see the results immediately
		cookies.set(`voted_${betId}`, 'true', { 
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});

		return { success: true };
	},
	viewResults: async ({ params, cookies }) => {
		const betId = params.id;
		const cookieName = `voted_${betId}`;
		
		// Set cookie to allow viewing results without voting
		cookies.set(cookieName, 'true', { 
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});

		return { success: true };
	}
} satisfies Actions;