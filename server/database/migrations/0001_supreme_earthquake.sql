CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`completed` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	`last_active` integer,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`completed` integer NOT NULL,
	`book_id` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	`last_active` integer,
	`deleted_at` integer,
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_habits` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`complete_days` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	`habit_view` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_habits`("id", "user_id", "title", "description", "complete_days", "created_at", "habit_view") SELECT "id", "user_id", "title", "description", "complete_days", "created_at", "habit_view" FROM `habits`;--> statement-breakpoint
DROP TABLE `habits`;--> statement-breakpoint
ALTER TABLE `__new_habits` RENAME TO `habits`;--> statement-breakpoint
PRAGMA foreign_keys=ON;