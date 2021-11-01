import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import path from "path";

const mongodb = async () => {
  return await MongoMemoryServer.create();
};

const globalConfigPath = path.join(__dirname, "globalConfigMongo.json");

/**
 * Connect to the in-memory database.
 */
async function connect() {
  const uri = (await mongodb()).getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri);
}

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongodb()).stop();
};

/**
 * Remove all the data for all db collections.
 */
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export { connect, closeDatabase, clearDatabase, globalConfigPath, mongodb };
