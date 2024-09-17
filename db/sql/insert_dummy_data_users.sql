INSERT INTO "users" (
        "id",
        "email",
        "password_hash",
        "namebigint",
        "profile_photo_url",
        "trust_level",
        "account_locked"
    )
VALUES (
        1,
        'john.doe@example.com',
        'hash_password_1',
        'John Doe',
        'https://example.com/photos/johndoe.jpg',
        1.0,
        FALSE
    ),
    (
        2,
        'jane.smith@example.com',
        'hash_password_2',
        'Jane Smith',
        'https://example.com/photos/janesmith.jpg',
        2.5,
        FALSE
    ),
    (
        3,
        'mark.jones@example.com',
        'hash_password_3',
        'Mark Jones',
        'https://example.com/photos/markjones.jpg',
        3.0,
        TRUE
    ) ON CONFLICT ("id") DO NOTHING;