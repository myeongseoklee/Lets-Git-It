FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV AUTH_ACCESS_TOKEN=${AUTH_ACCESS_TOKEN} \
    AUTH_CLIENT_ID_PROD=${AUTH_CLIENT_ID_PROD} \
    AUTH_CLIENT_SECRETS_PROD=${AUTH_CLIENT_SECRETS_PROD} \
    AUTH_CLIENT_ID_DEV=${AUTH_CLIENT_ID_DEV} \
    AUTH_CLIENT_SECRETS_DEV=${AUTH_CLIENT_SECRETS_DEV} \
    AUTH_CALLBACK_DEV=${AUTH_CALLBACK_DEV} \
    DB_PORT=${DB_PORT} \ 
    DB_TYPE=${DB_TYPE} \
    DB_DATABASE_PROD=${DB_DATABASE_PROD} \
    DB_DATABASE_DEV=${DB_DATABASE_DEV} \
    DB_HOST_PROD=${DB_HOST_PROD} \
    DB_HOST_DEV=${DB_HOST_DEV} \
    DB_USERNAME_PROD=${DB_USERNAME_PROD} \
    DB_USERNAME_DEV=${DB_USERNAME_DEV} \
    DB_PASSWORD_PROD=${DB_PASSWORD_PROD} \
    DB_PASSWORD_DEV=${DB_PASSWORD_DEV} \
    DB_LOGGING_DEV=${DB_LOGGING_DEV} \
    DB_LOGGING_PROD=${DB_LOGGING_PROD} \
    DB_SYNCHRONIZE_DEV=${DB_SYNCHRONIZE_DEV} \
    DB_SYNCHRONIZE_PROD=${DB_SYNCHRONIZE_PROD} \
    DOCKERHUB_TOKEN=${DOCKERHUB_TOKEN} \
    DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME} \
    JWT_EXPIRES_IN=${JWT_EXPIRES_IN} \
    JWT_SECRET_KEY=${JWT_SECRET_KEY} \
    JWT_REFRESH_SECRET_KEY=${JWT_REFRESH_SECRET_KEY} \
    JWT_REFRESH_EXPIRES_IN=${JWT_REFRESH_EXPIRES_IN} \
    REFRESH_SALT=${REFRESH_SALT} \
    REFRESH_ITERATIONS=${REFRESH_ITERATIONS} \
    REFRESH_KEYLEN=${REFRESH_KEYLEN} \
    REFRESH_DIGEST=${REFRESH_DIGEST} \
    COOKIE_SECRET_KEY=${COOKIE_SECRET_KEY} \
    COOKIE_DOMAIN=${COOKIE_DOMAIN} \
    COOKIE_DOMAIN_DEV=${COOKIE_DOMAIN_DEV} \
    PORT=${PORT} \
    S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID} \
    S3_SECRET_ACEESS_KEY=${S3_SECRET_ACEESS_KEY} \
    S3_BUCKET_NAME_PROD=${S3_BUCKET_NAME_PROD} \
    S3_BUCKET_NAME_DEV=${S3_BUCKET_NAME_DEV} \
    AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
    AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}\
    SWAGGER_USER=${SWAGGER_USER} \
    SWAGGER_PASSWORD=${SWAGGER_PASSWORD} \
    CORS_DEV_ORIGIN=${CORS_DEV_ORIGIN} \
    CORS_ORIGIN=${CORS_ORIGIN}

EXPOSE 3000

CMD [ "npm", "run", "start:prod"  ]