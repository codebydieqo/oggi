import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Tables
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  user_id: text("user_id").unique().notNull(),
  email: text("email").unique().notNull(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  image_url: text("image_url"),
});

export const folders = pgTable("folders", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  name: text("name").notNull(),
});

export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  folder_id: uuid("folder_id")
    .notNull()
    .references(() => folders.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  folders: many(folders),
  files: many(files),
}));

export const foldersRelations = relations(folders, ({ many, one }) => ({
  user: one(users, {
    fields: [folders.user_id],
    references: [users.user_id],
  }),
  files: many(files),
}));

export const filesRelations = relations(files, ({ one }) => ({
  user: one(users, {
    fields: [files.user_id],
    references: [users.user_id],
  }),
  folder: one(folders, {
    fields: [files.folder_id],
    references: [folders.id],
  }),
}));
