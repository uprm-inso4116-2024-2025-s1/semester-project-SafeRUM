CREATE TABLE IF NOT EXISTS "admins" (
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "admins_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "admins_user_id_unique" UNIQUE ("user_id"),
    CONSTRAINT "admins_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);