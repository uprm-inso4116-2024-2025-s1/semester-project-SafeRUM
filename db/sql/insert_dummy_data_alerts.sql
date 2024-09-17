INSERT INTO "alerts" (
        "id",
        "admin_id",
        "alert_type",
        "message",
        "location",
        "latitude",
        "longitude"
    )
VALUES (
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
    ) ON CONFLICT ("id") DO NOTHING;