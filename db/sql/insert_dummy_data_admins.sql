INSERT INTO "admins" ("id", "user_id", "role")
VALUES 
    (1, 1, 'Super Admin'),
    (2, 2, 'Moderator'),
    (3, 3, 'Admin'),
    (4, 4, 'Moderator')
ON CONFLICT ("id") DO NOTHING;
