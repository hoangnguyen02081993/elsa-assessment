# Elsa Interview Assessment
* *Service name:* elsa-assessment-services
* *Framework:* NestJS
* *DatabaseORM:* Prisma

# Architecture overview
![Architecture overview](https://github.com/hoangnguyen02081993/elsa-assessment/blob/main/documents/architecture-overview.jpg?raw=true)

# Submission data flow
![Submission data flow](https://github.com/hoangnguyen02081993/elsa-assessment/blob/main/documents/submission-data-flow.jpg?raw=true)

# Source code structure
```
├── client (for frontend website)
├── deployment-config
├── scripts
├── README.md
├── nest-cli.json
├── yarn.lock
├── package.json
├── prisma
├── src
│   ├── app.module.ts
│   ├── main.ts
│   ├── config
│       ├── configuration.ts
│       └── validation.ts
│   ├── constants (for service constants)
│   ├── decorators (for some decorators)
│   ├── exceptions (exception modoles)
│   ├── filters (middleware for error handler)
│   ├── interceptors (service interceptors)
│   ├── interfaces (for the service interfaces)
│   ├── middlewares (service middlewares)
│   ├── models (some service common models)
│   ├── modules
│       ├── health
│       ├── http
│       ├── loggers
│       ├── prisma (prisma service)
│       ├── shared (the folder to define the shared services)
│       └── ... (domain modules)
│   ├── types
│   ├── utils
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── migrations.sh
├── Dockerfile
└── tsconfig.json
```

# ENV(s)
## Common configuration
|Name|Description|Default value|
|---|---|---|
|ENVIRONMENT| The environment of the server(local,development,qa,staging,prodution)|local|
|TZ|The timezone of the service|UTC|
|LOG_LEVEL|The log level of the service (error,warn,debug,info)|info|
|PORT|The service port|3000|
|HTTP_REQUEST_TIMEOUT|The http request timeout for all internal requests|10000|
|AUTH_SERVICE_URL|The auth service url|http://localhost:3001|
|QUIZ_API_SERVICE_URL|The quiz API service url|http://localhost:3002|
|SOCKET_MANAGER_SERVICE_URL|The socket manager service url|http://localhost:3004|
## The API Gateway Service
|Name|Description|Default value|
|---|---|---|
|APP_NAME=**API_GATEWAY**|The specific app name|API_GATEWAY|
|IGNORE_AUTH_GUARD|Ignore auth guard check|false|
|JWT_ACCESS_TOKEN_PUBLIC_KEY| The public key to verify access token ||
## The Auth Service
|Name|Description|Default value|
|---|---|---|
|APP_NAME=**AUTH_SERVICE**|The specific app name|AUTH_SERVICE|
|IGNORE_AUTH_GUARD|Ignore auth guard check|true|
|JWT_ACCESS_TOKEN_PRIVATE_KEY| The private key to sign access token ||
|JWT_ACCESS_TOKEN_PUBLIC_KEY| The public key to verify access token ||
|JWT_REFRESH_TOKEN_PRIVATE_KEY| The private key to sign refresh token ||
|JWT_REFRESH_TOKEN_PUBLIC_KEY| The public key to verify refresh token ||
## The Quiz API Service
|Name|Description|Default value|
|---|---|---|
|APP_NAME=**QUIZ_API_SERVICE**|The specific app name|QUIZ_API_SERVICE|
|POSTGRESQL_USER| user of postgres db||
|POSTGRESQL_PASSWORD| password of postgres db||
|POSTGRESQL_HOST| host of postgres db||
|POSTGRESQL_DB| postgres db||
|POSTGRESQL_PORT| port of postgres db||
|REDIS_MODE| client or cluster|client|
|REDIS_HOST| client redis host|localhost|
|REDIS_PORT| client redis port|6379|
|REDIS_CLUSTER_NODES| The list of redis node in cluster mode. Split by comma.||
|IGNORE_AUTH_GUARD|Ignore auth guard check|true|
## The Quiz Consumer Service
|Name|Description|Default value|
|---|---|---|
|APP_NAME=**QUIZ_CONSUMER_SERVICE**|The specific app name|QUIZ_CONSUMER_SERVICE|
|IGNORE_AUTH_GUARD|Ignore auth guard check|true|
## The Socket manager Service
|Name|Description|Default value|
|---|---|---|
|APP_NAME=**SOCKET_MANAGER_SERVICE**|The specific app name|SOCKET_MANAGER_SERVICE|
|IGNORE_AUTH_GUARD|Ignore auth guard check|true|

# How to install dependencies
## For dev
```
$ yarn install
```
## For production
```
$ yarn install --frozen-lockfile 
```

# How to create/ apply new migration
## Create new migration
```
$ set -o allexport && source .env
$ ./scripts/create-migration.sh <migration_name>
```
## Apply the migration
```
$ set -o allexport && source .env
$ ./scripts/migration.sh
```
Note: Please setup the `DATABASE_URL` point to the database engine we want to migrate

# How to run the seed data
```
$ set -o allexport && source .env
$ ./scripts/seed.sh
```

# How to run the service
* Copy the `.env.example` to `.env` and config the env environment
* Install the dependencies
* Install prisma client 
    ```
    $ npx prisma generate
    ```
* Run the command to run the service
    ```
    $ yarn start:dev
    ```
* Run the command to run the API gateway service
    ```
    $ yarn start:dev:gateway
    ```
* Run the command to run the auth service
    ```
    $ yarn start:dev:auth
    ```
* Run the command to run the quiz API service
    ```
    $ yarn start:dev:quiz
    ```
* Run the command to run the quiz consumer service
    ```
    $ yarn start:dev:quiz-consumer
    ```
* Run the command to run the socket manager service
    ```
    $ yarn start:dev:socket
    ```
* Run the command to run the frontend service
    ```
    $ yarn start:client
    ```


# How to run the unit test / coverage test
## Unit test
```
$ yarn test
```

## Coverage test
```
$ yarn test:cov
```

## Run in container (docker-compose) for whole system
```
# To up the system
$ docker-compose up --build -d
# To down the system
$ docker-compose down
```
Note: This step require docker and docker compose installation