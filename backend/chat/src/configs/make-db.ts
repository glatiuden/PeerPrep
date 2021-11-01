import mongoose from "mongoose";
import { mongodb } from "../../__tests__/__fixtures__/jest-mongo";

async function makeDb() {
  const DATABASE_URL = await makeDatabaseURL();
  const DATABASE_OPTIONS = makeDatabaseOptions();

  const is_not_connected = mongoose.connection.readyState == 0;
  if (is_not_connected) {
    console.log("Setting up database...");
    await mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);
    console.log("Successfully connected to DB");
  }
  return mongoose;
}

export async function makeDatabaseURL(): Promise<string> {
  const { MONGO_USERNAME = "admin", MONGO_PASSWORD = "abc", MONGO_CLUSTER = "abc", MONGO_DB = "abc" } = process.env;
  if (process.env.NODE_ENV === "test") {
    return (await mongodb()).getUri();
  }

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
