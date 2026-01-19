import {
  text,
  time,
  serial,
  pgEnum,
  integer,
  varchar,
  boolean,
  numeric,
  pgTable,
  timestamp,
  date,
} from 'drizzle-orm/pg-core';

export const therapistsTable = pgTable('therapists', {
  id: serial('id').primaryKey(),
  bio: text('bio'),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  active: boolean('active').notNull().default(true),
  specialty: varchar('specialty', { length: 255 }).notNull(),

  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: false }),
  deletedAt: timestamp('deleted_at', { withTimezone: false }),
});

export const servicesTable = pgTable('services', {
  id: serial('id').primaryKey(),
  duration: integer('duration').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  active: boolean('active').notNull().default(true),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
});

export const slotsTable = pgTable('therapist_avaliable_slots', {
  id: serial('id').primaryKey(),
  therapistId: integer('therapist_id')
    .notNull()
    .references(() => therapistsTable.id),

  date: date('date').notNull(),
  end_time: time('end_time').notNull(),
  start_time: time('start_time').notNull(),
  booked: boolean().notNull().default(false),
});

export const clientsTable = pgTable('clients', {
  id: serial('id').primaryKey(),
  phone: varchar('phone', { length: 50 }).unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
});

export const bookingStatusEnum = pgEnum('booking_status', [
  'COMPLETA',
  'ALTERADA',
  'CANCELADA',
  'CONFIRMADA',
]);

export type EBookingStatus = 'COMPLETA' | 'ALTERADA' | 'CANCELADA' | 'CONFIRMADA';

export const bookingsTable = pgTable('bookings', {
  id: serial('id').primaryKey(),

  therapistId: integer('therapist_id')
    .notNull()
    .references(() => therapistsTable.id),
  clientId: integer('client_id')
    .notNull()
    .references(() => clientsTable.id),
  serviceId: integer('service_id')
    .notNull()
    .references(() => servicesTable.id),

  date: date('date').notNull(),
  endTime: time('end_time').notNull(),
  startTime: time('start_time').notNull(),

  status: bookingStatusEnum('status').notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: false }),
  cancelled_at: timestamp('cancelled_at', { withTimezone: false }),
  created_at: timestamp('created_at', { withTimezone: false }).notNull().defaultNow(),
});
