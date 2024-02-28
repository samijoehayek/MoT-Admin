ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine as build

ARG api_endpoint jwt_secret

ENV NEXT_PUBLIC_API_HOST=$api_endpoint JWT_SECRET_KEY=$jwt_secret

RUN apk --no-cache add --virtual  builds-deps build-base python3 git make g++

COPY package.json ./

RUN npm install -g --force yarn pm2 next

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3001 3001

CMD [ "yarn", "start" ]

