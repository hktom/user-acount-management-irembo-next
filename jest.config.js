module.exports = {
  collectCoverageFrom: ["src/**/*.ts"],
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "babel-jest",
  },
};
