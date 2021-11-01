import mongoose, { Mongoose } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import fs from "fs";
import path from "path";

const globalConfigPath = path.join(__dirname, "globalConfigMongo.json");

/**
 * Connect to the in-memory database.
 */
async function connect() {
  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };
  const mongoServer = global.__MONGOINSTANCE || new MongoMemoryServer();
  const is_not_connected = mongoose.connection.readyState == 0;
  if (is_not_connected) {
    const URI = process.env.MONGO_URI || (await mongoServer.getUri());
    try {
      await mongoose.connect(URI);
    } catch (err) {
      console.log("Failed to connect to MongoDB");
      process.exit(0);
    }
  }
}

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await global.__MONGOINSTANCE.stop();
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

export { connect, closeDatabase, clearDatabase, globalConfigPath };
