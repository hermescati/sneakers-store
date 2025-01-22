# Use the official PostgreSQL image
FROM postgres

# Set environment variables
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DATABASE}
ENV POSTGRES_HOST_AUTH_METHOD=trust

# Expose the PostgreSQL port
EXPOSE 5432

# Volume to persist data
VOLUME /var/lib/postgresql/data
