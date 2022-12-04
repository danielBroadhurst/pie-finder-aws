/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.ts?(x)",
    "<rootDir>/(test|src)/**/*(*.)@(spec|test).ts?(x)",
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "clover", "cobertura", "text"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  testPathIgnorePatterns: ["/node_modules/"],
  watchPathIgnorePatterns: ["/node_modules/"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test-reports",
      },
    ],
  ],
  preset: "ts-jest",
};
