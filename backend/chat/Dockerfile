FROM node:14-alpine

WORKDIR /usr/src/chat

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

EXPOSE 3005
CMD [ "yarn", "start" ]
