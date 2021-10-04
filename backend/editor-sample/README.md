# (SAMPLE) Editor Microservice

This folder contains the basic CRUD operations via 3-Tier Architecture (MVC-like) and MongoDB.

This folder is meant for referencing only, not to be edited.

Please login to the MongoDB Atlas and create database for your service.

Obtain the credentials for your own DB and create a `.env` file in the directory with the variables and your own user credentials.

Example of `.env`
```
NODE_ENV="staging"
MONGO_USERNAME="admin"
MONGO_PASSWORD="abc123"
MONGO_DB="editor-service"
```

**Install the necessary modules**
```
yarn install
```

**Start the server**
```
yarn dev
```

1. Data Layer (`./models`)
Each model should have an interface and schema. Interface is to parse to TypeScript object while Schema is to define the variables required.