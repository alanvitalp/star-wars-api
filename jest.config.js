const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts']
}

module.exports = createJestConfig(customJestConfig)
