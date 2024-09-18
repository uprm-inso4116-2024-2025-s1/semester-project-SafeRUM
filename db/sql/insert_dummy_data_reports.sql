INSERT INTO "reports" (
        "id",
        "creator_id",
        "title",
        "description",
        "location",
        "latitude",
        "longitude",
        "status",
        "category"
    )
VALUES (
        1,
        2,
        'Suspicious Activity',
        'Observed suspicious behavior near the library',
        'Library',
        18.4655,
        -66.1057,
        'Pending',
        'General'
    ),
    (
        2,
        3,
        'Broken Streetlight',
        'The streetlight near the main entrance is not working',
        'Main Entrance',
        18.4661,
        -66.1060,
        'Reviewed',
        'Maintanance'
    ) ON CONFLICT ("id") DO NOTHING;