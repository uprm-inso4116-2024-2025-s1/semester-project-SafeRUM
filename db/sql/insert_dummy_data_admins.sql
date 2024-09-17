INSERT INTO "admins" ("id", "user_id", "role")
VALUES (1, 1, 'Super Admin'),
    (2, 2, 'Moderator') ON CONFLICT ("id") DO NOTHING;