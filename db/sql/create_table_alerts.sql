CREATE TABLE IF NOT EXISTS "alerts" (
    "id" BIGINT NOT NULL,
    "admin_id" BIGINT NOT NULL,
    "alert_type" VARCHAR(255) CHECK ("alert_type" IN ('SOS', 'Panic', 'Safety Info')) NOT NULL,
    "message" TEXT NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "latitude" FLOAT(53) NOT NULL,
    "longitude" FLOAT(53) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "alerts_admin_id_foreign" FOREIGN KEY ("admin_id") REFERENCES "admins" ("id")
);