CREATE TABLE IF NOT EXISTS "users" (
    "id" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "namebigint" VARCHAR(255) NOT NULL,
    "profile_photo_url" VARCHAR(255) NULL,
    "trust_level" FLOAT(53) NOT NULL DEFAULT '0',
    "account_locked" BOOLEAN NOT NULL DEFAULT '0',
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "users_email_unique" UNIQUE ("email")
);