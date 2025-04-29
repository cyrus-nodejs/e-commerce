/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
   setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};