INSERT INTO "users" (
        "id",
        "email",
        "password_hash",
        "namebigint",
        "profile_photo_url",
        "trust_level",
        "account_locked"
    ) VALUES (
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
    ),
    (
        4,
        'lucy.brown@example.com',
        'hash_password_4',
        'Lucy Brown',
        'https://example.com/photos/lucybrown.jpg',
        4.0,
        FALSE
    ),
    (
        5,
        'david.wilson@example.com',
        'hash_password_5',
        'David Wilson',
        'https://example.com/photos/davidwilson.jpg',
        1.5,
        TRUE
    ),
    (
        6,
        'susan.lee@example.com',
        'hash_password_6',
        'Susan Lee',
        'https://example.com/photos/susanlee.jpg',
        2.0,
        FALSE
    ) ON CONFLICT ("id") DO NOTHING;
