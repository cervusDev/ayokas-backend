import { pgTable, primaryKey, varchar, text, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { v7 as uuidv7 } from 'uuid';

export const userTable = pgTable(
  'therapists',
  {
    id: text('id').$defaultFn(() => uuidv7()),

    name: varchar("name", { length: 255 }).notNull(),
    bio: text('bio'),
    specialty: varchar('specialty', { length: 255 }),
    active: boolean('active').default(true).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),

    createdAt: timestamp('created_at', { withTimezone: false }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: false }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({
      name: 'therapists_pkey',
      columns: [table.id],
    }),
  ],
);
