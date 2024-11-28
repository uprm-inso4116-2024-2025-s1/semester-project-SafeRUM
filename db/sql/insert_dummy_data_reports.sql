INSERT INTO "reports" (
        "id",
        "creator_id",
        "title",
        "description",
        "location",
        "latitude",
        "longitude",
        "status",
        "category",
        "priority"
    ) VALUES (
        1,
        2,
        'Suspicious Activity',
        'Observed suspicious behavior near the library',
        'Library',
        18.4655,
        -66.1057,
        'Pending',
        'General',
        TRUE
    ),
    (
        2,
        2,
        'Broken Streetlight',
        'The streetlight near the main entrance is not working',
        'Main Entrance',
        18.4661,
        -66.1060,
        'Reviewed',
        'Maintenance',
        FALSE
    ),
    (
        3,
        4,
        'Vandalism',
        'Graffiti found on the side wall of the cafeteria',
        'Cafeteria',
        18.4658,
        -66.1075,
        'Pending',
        'Security',
        TRUE
    ),
    (
        4,
        5,
        'Water Leak',
        'Water leaking from the pipe near the parking lot',
        'Parking Lot',
        18.4670,
        -66.1080,
        'Resolved',
        'Maintenance',
        FALSE
    ) ON CONFLICT ("id") DO NOTHING;
