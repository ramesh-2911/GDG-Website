/**
 * jest.config.ts — GDG On Campus IIE
 * Jest configuration for unit tests with ts-jest and jsdom.
 */
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app
  dir: "./",
});

const config: Config = {
  // Use ts-jest transformer
  preset: "ts-jest",

  // jsdom simulates the browser environment
  testEnvironment: "jest-environment-jsdom",

  // Setup file — runs after the test framework is installed
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Module name mapper for CSS modules and Next.js image imports
  moduleNameMapper: {
    // Handle CSS modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    // Handle static assets
    "^.+\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    // Handle @/ path alias
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Test file patterns
  testMatch: [
    "<rootDir>/__tests__/**/*.test.{ts,tsx}",
    "<rootDir>/src/**/*.test.{ts,tsx}",
  ],

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/layout.tsx",
    "!src/app/page.tsx",
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default createJestConfig(config);
