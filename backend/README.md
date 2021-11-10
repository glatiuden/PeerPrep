# PeerPrep Backend

Each service are created as microservices using Node.js and ExpressJS.

## Build Setup
A `.env` file is used to easily switch the database endpoints between development, staging, and production environments. A sample `.env.sample` is included in every folder. 
Please copy and change it to `.env`. Then, you may change the values to one of your choices. Please do not remove any of the variables as all of them is required.

### MongoDB
All the microservices (except video-chat) use MongoDB as a persistent database.
Please signup for an account on their [official website](https://www.mongodb.com/) to obtain the endpoint and set it in the `.env` file.

### MongoDB
All the microservices (except user and video-chat) uses Redis as a cache database.
Please signup for an account on their [official website](https://redis.com/) to obtain the endpoint and set it in the `.env` file.

### CloudAMQP
For the user, question and match microservices, it uses CloudAMQP as RabbitMQ as a Service. You need to obtain a CloudAMPQ endpoint.
Please signup for an account on their [official website](https://www.cloudamqp.com/) to obtain the endpoint and set it in the `.env` file.

To run the microservices, please go to the desired microservice folder and run:

```bash
# install dependencies
$ yarn install

# serve with nodemon
$ yarn dev
```

## Running services locally

`local-build` is created for development purposes, where a reverse proxy is created to redirect the service using `http://localhost:3006`. Instructions is included in the folder itself.

## Building of Docker images to push to ECR manually

A `build.sh` script is also included in the folder. If you are not using any form of CI and would like to push the images more efficiently, please run `build.sh` after changing the ECR repository endpoint to your own.