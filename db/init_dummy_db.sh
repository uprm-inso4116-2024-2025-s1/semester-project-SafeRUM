#!/bin/bash

# Database credentials
DB_NAME="safe-rum-db-dev-dummy"
DB_USER="postgres"
DB_PASSWORD="postgres"  # password for the postgres user
DB_HOST="localhost"  # e.g., localhost or a specific hostname
DB_PORT="5432"  # default is 5432 for PostgreSQL
SCRIPT_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

# Set the current working directory to the script's location
cd "$SCRIPT_DIR/sql"

# Export password for psql
export PGPASSWORD=$DB_PASSWORD

# Create tables
echo "Creating users table..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f create_table_users.sql
if [ $? -ne 0 ]; then
    echo "Failed to create users table!"
    exit 1
fi

echo "Creating admins table..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f create_table_admins.sql
if [ $? -ne 0 ]; then
    echo "Failed to create admins table!"
    exit 1
fi

echo "Creating reports table..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f create_table_reports.sql
if [ $? -ne 0 ]; then
    echo "Failed to create reports table!"
    exit 1
fi

echo "Creating alerts table..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f create_table_alerts.sql
if [ $? -ne 0 ]; then
    echo "Failed to create alerts table!"
    exit 1
fi

# Insert dummy data into users
echo "Inserting data into users table..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f insert_dummy_data_users.sql
if [ $? -ne 0 ]; then
    echo "Failed to insert data into users table!"
    exit 1
fi

# Insert dummy data into admins
echo "Inserting data into admins table..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f insert_dummy_data_admins.sql
if [ $? -ne 0 ]; then
    echo "Failed to insert data into admins table!"
    exit 1
fi

# Insert dummy data into reports
echo "Inserting data into reports table..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f insert_dummy_data_reports.sql
if [ $? -ne 0 ]; then
    echo "Failed to insert data into reports table!"
    exit 1
fi

# Insert dummy data into alerts
echo "Inserting data into alerts table..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f insert_dummy_data_alerts.sql
if [ $? -ne 0 ]; then
    echo "Failed to insert data into alerts table!"
    exit 1
fi

echo "All tables created and dummy data inserted successfully!"

# Unset the password after the script is done
unset PGPASSWORD
