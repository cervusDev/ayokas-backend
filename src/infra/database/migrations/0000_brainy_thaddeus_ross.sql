CREATE TYPE "public"."booking_status" AS ENUM('COMPLETA', 'ALTERADA', 'CANCELADA', 'CONFIRMADA');--> statement-breakpoint
CREATE TABLE "therapist_avaliable_slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"therapist_id" integer NOT NULL,
	"date" date NOT NULL,
	"end_time" time NOT NULL,
	"start_time" time NOT NULL,
	"booked" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"therapist_id" integer NOT NULL,
	"client_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"date" date NOT NULL,
	"end_time" time NOT NULL,
	"start_time" time NOT NULL,
	"status" "booking_status" NOT NULL,
	"updated_at" timestamp,
	"cancelled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" varchar(50),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "clients_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"duration" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"price" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "therapists" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text,
	"name" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"specialty" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "therapist_avaliable_slots" ADD CONSTRAINT "therapist_avaliable_slots_therapist_id_therapists_id_fk" FOREIGN KEY ("therapist_id") REFERENCES "public"."therapists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_therapist_id_therapists_id_fk" FOREIGN KEY ("therapist_id") REFERENCES "public"."therapists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;