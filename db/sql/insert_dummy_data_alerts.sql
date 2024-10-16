INSERT INTO "alerts" (
        "id",
        "admin_id",
        "alert_type",
        "message",
        "location",
        "latitude",
        "longitude"
    ) VALUES (
        1,
        1,
        'SOS',
        'Emergency reported near the library. Immediate assistance required.',
        'Library',
        18.4655,
        -66.1057
    ),
    (
        2,
        2,
        'Panic',
        'Crowd gathering near the main entrance, possible safety concern.',
        'Main Entrance',
        18.4661,
        -66.1060
    ),
    (
        3,
        3,
        'Panic',
        'Smoke detected in the cafeteria. Evacuate immediately.',
        'Cafeteria',
        18.4658,
        -66.1075
    ),
    (
        4,
        4,
        'Safety Info',
        'Unattended package reported near the parking lot.',
        'Parking Lot',
        18.4670,
        -66.1080
    ) ON CONFLICT ("id") DO NOTHING;
