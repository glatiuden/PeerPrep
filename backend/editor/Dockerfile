FROM node:14-alpine

WORKDIR /usr/src/editor

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

EXPOSE 3004
CMD [ "yarn", "start" ]
