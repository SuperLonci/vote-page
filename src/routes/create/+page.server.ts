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

		if (!title || !answerType) {
			return fail(400, { missing: true });
		}

		const newId = uuidv4();

		// Insert into SQLite
		await db.insert(bets).values({
			id: newId,
			title,
			description,
			answerType
		});

		// Redirect to the list page
		throw redirect(303, `/list/${newId}`);
	}
} satisfies Actions;