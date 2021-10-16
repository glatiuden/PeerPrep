FROM node:14-alpine

WORKDIR /usr/src/chat

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

EXPOSE 3005
CMD [ "yarn", "start" ]
