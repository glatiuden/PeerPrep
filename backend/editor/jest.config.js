const esModules = ["y-protocols", "lib0"].join("|");

module.exports = {
  preset: "ts-jest",
  verbose: false,
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [1100, 1226, 2418, 2345, 2339, 2769, 2322, 7053, 2740, 2739],
      },
    },
  },
  testMatch: ["**/?(*.)+(spec|test).[t]s?(x)"],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  testPathIgnorePatterns: ["/node_modules/", "/__fixtures__/"],
  modulePathIgnorePatterns: ["/__mocks__/", "/dist/"],
  globalSetup: "./__tests__/__fixtures__/jest-setup.ts",
  globalTeardown: "./__tests__/__fixtures__/jest-teardown.ts",
  setupFilesAfterEnv: ["./__tests__/__fixtures__/jest-mongo.ts"],
  testEnvironment: "node",
};
