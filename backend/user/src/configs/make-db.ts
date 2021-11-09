import mongoose from "mongoose";

async function makeDb() {
  const DATABASE_URL = makeDatabaseURL();
  const DATABASE_OPTIONS = makeDatabaseOptions();

  const is_not_connected = mongoose.connection.readyState == 0;
  if (is_not_connected) {
    console.log("Setting up database...");
    await mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);
    console.log("Successfully connected to DB");
  }
  return mongoose;
}

export function makeDatabaseURL(): string {
  if (process.env.NODE_ENV === "test") {
    return `mongodb://127.0.0.1:27017/test`;
  }
  const {
    MONGO_USERNAME = "admin",
    MONGO_PASSWORD = "CfP5yievMjLAncX4",
    MONGO_CLUSTER = "cluster0.mhmgq",
    MONGO_DB = "user-service",
  } = process.env;
  const DATABASE_URL =
    process.env.DATABASE_URL ||
    `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;
  return DATABASE_URL;
}

export function makeDatabaseOptions() {
  const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
  };
  return options;
}

export default makeDb;
