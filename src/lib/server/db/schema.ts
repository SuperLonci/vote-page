import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Table to store the bet definition
export const bets = sqliteTable('bets', {
	id: text('id').primaryKey(), // We will use UUIDs
	title: text('title').notNull(),
	description: text('description'),
	answerType: text('answer_type', { enum: ['text', 'number', 'date'] }).notNull(),
	creatorName: text('creator_name').notNull(),
	resolveDate: integer('resolve_date', { mode: 'timestamp' }).notNull(),
	endOfEntryDate: integer('end_of_entry_date', { mode: 'timestamp' }),
	endOfEntryEnabled: integer('end_of_entry_enabled', { mode: 'boolean' }).default(false),
	canBeWon: integer('can_be_won', { mode: 'boolean' }).default(false),
	winItem: text('win_item'),
	isWinSecret: integer('is_win_secret', { mode: 'boolean' }).default(false),
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