import { fail, redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { db } from '$lib/server/db';
import { bets } from '$lib/server/db/schema';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const description = data.get('description') as string;
		const answerType = data.get('answerType') as 'text' | 'number' | 'date';
		const creatorName = data.get('creatorName') as string;
		const resolveDate = new Date(data.get('resolveDate') as string);
		const endOfEntryEnabled = data.get('endOfEntryEnabled') === 'true';
		const endOfEntryDateStr = data.get('endOfEntryDate') as string;
		const canBeWon = data.get('canBeWon') === 'true';
		const winItem = data.get('winItem') as string;
		const isWinSecret = data.get('isWinSecret') === 'true';

		if (!title || !answerType || !creatorName) {
			return fail(400, { missing: true });
		}

		let endOfEntryDate: Date | null = null;
		if (endOfEntryEnabled && endOfEntryDateStr) {
			endOfEntryDate = new Date(endOfEntryDateStr);
		}

		const newId = uuidv4();

		// Insert into SQLite
		await db.insert(bets).values({
			id: newId,
			title,
			description,
			answerType,
			creatorName,
			resolveDate,
			endOfEntryDate,
			endOfEntryEnabled,
			canBeWon,
			winItem: canBeWon ? winItem : null,
			isWinSecret: canBeWon && isWinSecret
		});

		// Redirect to the list page
		throw redirect(303, `/list/${newId}`);
	}
} satisfies Actions;