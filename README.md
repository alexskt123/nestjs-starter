# NestJS starter pack

## Background

To provide a starter pack for implementation of the followings in Nestjs
- Postgres (DB)
- Typeorm (ORM)
- GraphQL
- Restful APIs
- Kafka

## Requirements

- Node 18
- Yarn 1

## Installation

### Configuration

1. Make a copy of the `.env.example` file and rename it as `.env`. Ypdate the values for the environment variables within this `.env` file. The `.env.example` file contains sensible default values for local development, change them as required.

## How to use

### Running the service in docker

1. Run `docker compose up -d` to start all required services.

### Connection to the app

1. Open swagger UI at `http://localhost:5555/api` to check the API documentation.
2. Open pgadmin4 UI at `http://localhost:5556` to connect to the postgres database
3. Open GraphQL playground at `http://localhost:5555/graphql` for executing GraphQL queries

## Test and Coverage

- Coverage: `yarn test:cov`
- Test: `yarn test`

## Create new migration scripts

- Run `typeorm migration:create ./src/migrations/{file-name}.ts`