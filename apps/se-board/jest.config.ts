import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["whatwg-fetch", "source-map-support/register"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
