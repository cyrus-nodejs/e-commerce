

export default {
    preset: 'ts-jest',
     globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
    testEnvironment: 'node',
     testMatch: ['**/__tests__/**/*.ts', '**/*.test.ts'],
    setupFilesAfterEnv:['./jest.setup.ts']
  };

