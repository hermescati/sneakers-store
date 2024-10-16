#!/usr/bin/env bash

DB_CONTAINER_NAME="sneakers-db"

# Load environment variables from .env file
set -a
source .env

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Docker is not installed. Please install Docker and try again."
  echo "Docker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# Stop and remove the existing container if it exists
if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
  docker stop $DB_CONTAINER_NAME
  docker rm $DB_CONTAINER_NAME
  echo "Existing database container stopped and removed."
fi

# Run a new PostgreSQL container with the specified database name, username, and password
docker run --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_HOST_AUTH_METHOD=trust \
  -e POSTGRES_DB=$POSTGRES_DATABASE \
  -d -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  docker.io/postgres

echo "Database container was successfully created"
