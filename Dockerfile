FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV AUTH_ACCESS_TOKEN=${AUTH_ACCESS_TOKEN} \
    AUTH_CLIENT_ID=${AUTH_CLIENT_ID} \
    AUTH_CLIENT_SECRETS=${AUTH_CLIENT_SECRETS} \
    DB_DATABASE=${DB_DATABASE} \
    DB_TYPE=${DB_TYPE} \
    DB_HOST=${DB_HOST} \
    DB_PORT=${DB_PORT} \ 
    DB_USERNAME=${DB_USERNAME} \
    DB_PASSWORD=${DB_PASSWORD} \
    DOCKERHUB_TOKEN=${DOCKERHUB_TOKEN} \
    DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME} \
    JWT_EXPIRES_IN=${JWT_EXPIRES_IN} \
    JWT_SECRET_KEY=${JWT_SECRET_KEY} \
    PORT=${PORT} \
    S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID} \
    S3_BUCKET_NAME=${S3_BUCKET_NAME} \
    S3_SECRET_ACEESS_KEY=${S3_SECRET_ACEESS_KEY} \
    AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
    AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

EXPOSE 3000

CMD [ "npm", "run", "start:prod"  ]