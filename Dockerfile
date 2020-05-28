# Build Stage
FROM node:12-alpine as node
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime Stage
FROM nginx:stable-alpine

COPY --from=node /usr/src/app/www /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
