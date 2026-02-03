import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Table to store the bet definition
export const bets = sqliteTable('bets', {
	id: text('id').primaryKey(), // We will use UUIDs
	title: text('title').notNull(),
	description: text('description'),
	answerType: text('answer_type', { enum: ['text', 'number', 'date'] }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

// Table to store user answers
export const answers = sqliteTable('answers', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	betId: text('bet_id').references(() => bets.id).notNull(),
	userName: text('user_name').notNull(),
	value: text('value').notNull(), // Stored as string, parsed based on answerType
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});