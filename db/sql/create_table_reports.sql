CREATE TABLE IF NOT EXISTS "reports" (
    "id" BIGINT NOT NULL,
    "creator_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "latitude" FLOAT(53) NOT NULL,
    "longitude" FLOAT(53) NOT NULL,
    "category" TEXT NOT NULL,
    "status" VARCHAR(255) CHECK ("status" IN ('Pending', 'Reviewed', 'Resolved')) NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reports_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "reports_creator_id_foreign" FOREIGN KEY ("creator_id") REFERENCES "users" ("id")
);