
import {
  integer,
  sqliteTable,
  text,
  AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const timestamps = {
  // Meta Data
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
  last_active: integer("last_active", { mode: "timestamp" })
    .$onUpdate(() => new Date())
    .$default(() => new Date()),
  // Soft Delete
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
};


export const books = sqliteTable("books", {
  id: text()
    .primaryKey()
    .$default(() => nanoid()),
  title: text().notNull(),
  completed: integer()
    .notNull()
    .$defaultFn(() => 0),
  ...timestamps,
});

export const todos = sqliteTable("todos", {
  id: text()
    .primaryKey()
    .$default(() => nanoid()),
  title: text().notNull(),
  completed: integer()
    .notNull()
    .$defaultFn(() => 0),

  bookId: text("book_id")
    .notNull()
    .references((): AnySQLiteColumn => books.id, { onDelete: "cascade" }),
  ...timestamps,
});


export const habits = sqliteTable('habits', {
  id: text('id').primaryKey(),
  userId: integer('user_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  completeDays: text('complete_days', { mode: 'json' }).$type<string[]>().notNull().default([]),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  habitView: integer('habit_view', { mode: 'boolean' }).notNull().default(false),
});

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  login: text('login').notNull().unique(),
  name: text('name'),
  bio: text('bio'),
  avatarUrl: text('avatar_url').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  userView: integer('user_view', { mode: 'boolean' }).notNull().default(false),
});
