module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
  roots: ['<rootDir>/__test__'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  testMatch: ['**/__test__/**/*.test.ts'],
  };