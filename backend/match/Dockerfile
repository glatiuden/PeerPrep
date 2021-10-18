FROM node:14-alpine

WORKDIR /usr/src/editor

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

EXPOSE 3003
CMD [ "yarn", "serve" ]
