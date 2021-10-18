FROM node:14-alpine

WORKDIR /usr/src/user

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

EXPOSE 3001
CMD [ "yarn", "serve" ]
