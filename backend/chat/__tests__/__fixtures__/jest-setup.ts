import { mongodb, connect } from "./jest-mongo";

module.exports = async () => {
  if (!(await mongodb()).instanceInfo) {
    await connect();
  }

  const mongoConfig = {
    mongoDBName: "jest",
    mongoUri: (await mongodb()).getUri(),
  };

  // Write global config to disk because all tests run in different contexts.
  // fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGODB__ = mongodb;
};
