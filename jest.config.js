module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/gas/config"],
  setupFiles: ["<rootDir>/src/__tests__/gas/config/setup-test.ts"],
  testEnvironment: "node",
};
