CREATE TABLE "therapists" (
	"id" text,
	"name" varchar(255) NOT NULL,
	"bio" text,
	"specialty" varchar(255),
	"active" boolean DEFAULT true NOT NULL,
	"phone" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "therapists_pkey" PRIMARY KEY("id")
);
