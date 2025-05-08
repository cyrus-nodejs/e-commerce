/** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//    setupFiles: ['<rootDir>/jest.setup.js'],
//   testEnvironment: "node",
//   transform: {
//     "^.+\.tsx?$": ["ts-jest",{}],
//   },
// };

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv:['./jest.setup.ts']
  };