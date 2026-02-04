CREATE TABLE `answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bet_id` text NOT NULL,
	`user_name` text NOT NULL,
	`value` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`bet_id`) REFERENCES `bets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bets` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`answer_type` text NOT NULL,
	`creator_name` text NOT NULL,
	`resolve_date` integer NOT NULL,
	`end_of_entry_date` integer,
	`end_of_entry_enabled` integer DEFAULT false,
	`can_be_won` integer DEFAULT false,
	`win_item` text,
	`is_win_secret` integer DEFAULT false,
	`created_at` integer
);
