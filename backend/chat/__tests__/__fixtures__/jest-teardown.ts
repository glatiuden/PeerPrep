import { clearDatabase, closeDatabase } from "./jest-mongo";

module.exports = async function ({ watch, watchAll }: { watch?: () => {}; watchAll?: () => {} } = {}) {
  if (!watch && !watchAll) {
    await clearDatabase();
    await closeDatabase();
    await global.__MONGODB__.stop();
  }
};
