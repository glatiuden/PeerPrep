FROM node:14-alpine

WORKDIR /usr/src/question

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

EXPOSE 3002
CMD [ "yarn", "serve" ]
