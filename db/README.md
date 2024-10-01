# SafeRUM Dummy Database Setup

This document outlines the steps to set up the PostgreSQL dummy database for the SafeRUM project using Docker Compose, initialize the tables, and insert dummy data.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 1. Environment Setup

Create a `.env` file in the root of the project directory. This file will be used by Docker Compose to configure the PostgreSQL container. Here’s the content for the `.env` file:

```bash
# .env file
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=safe-rum-db-dev-dummy
```

Ensure that the `.env` file is in the same directory as your `docker-compose.yml`.

## 2. Docker Compose Setup

The `docker-compose.yml` file will define the PostgreSQL container. **Do not change anything here if you do not know what you are doing.**

### Starting the Database

To start the PostgreSQL container, run the following command:

```bash
docker compose up -d --build
```

Here's a simple breakdown of the flags for command:

- **`up`**: This starts the services defined in the `docker-compose.yml` file. It will create and start containers for the services if they are not already running.

- **`-d`**: Stands for "detached mode." It runs the containers in the background, allowing you to continue using your terminal while the containers are running.

- **`--build`**: Forces a rebuild of the Docker images before starting the containers, even if they already exist. This is useful if you have made changes to the Dockerfile or application code.


The database will be exposed on port `5432` on `localhost`. You can check if the container is running by executing: `docker ps`

## 3. Running the Bash Script to Add Tables and Dummy Data

Once the PostgreSQL container is running, you need to create the tables and insert the dummy data. You can do this by running the provided bash script `init_dummy_db.sh`.

### Steps to Run the Bash Script:

1. Make sure the bash script has the right permissions to be executed. Run the following command if needed:

    ```bash
    chmod +x init_dummy_db.sh
    ```

2. Execute the script:

    ```bash
    ./init_dummy_db.sh
    ```

### Script Overview:

- The script will connect to the running PostgreSQL container and execute SQL files to create the necessary tables (`users`, `admins`, `reports`, `alerts`).
- After creating the tables, the script will insert dummy data into the tables.

## 4. Verifying the Setup

You can verify that the tables have been created and the data has been inserted by connecting to the PostgreSQL container and running some SQL queries.

1. Access the running PostgreSQL container:

    ```bash
    docker exec -it safe_rum_postgres psql -U postgres -d safe-rum-db-dev-dummy
    ```

2. Run SQL queries to check if the tables and data exist:

    ```sql
    \dt          -- List all tables
    SELECT * FROM users;  -- Check the users table
    SELECT * FROM admins; -- Check the admins table
    SELECT * FROM reports; -- Check the reports table
    SELECT * FROM alerts; -- Check the alerts table
    ```

## 5. Stopping and Cleaning Up

To stop the Docker Compose services and remove the containers:

```bash
docker compose down
```

If you want to stop and remove the container, along with the network and volumes:

```bash
docker compose down -v
```

This will remove the PostgreSQL container and all the data. Be careful when using the `-v` flag, as it will also remove any persistent data in the volume.

## Troubleshooting

- **Permission Errors**: Ensure the bash script has the correct permissions (`chmod +x init_dummy_db.sh`).
- **Database Connection Issues**: Check the `docker logs` of the PostgreSQL container if there are issues with the database setup:

    ```bash
    docker logs safe_rum_postgres
    ```

## Conclusion

After following the steps above, your PostgreSQL database for SafeRUM should be fully set up with the necessary tables and dummy data. You can now proceed with the application development or testing.