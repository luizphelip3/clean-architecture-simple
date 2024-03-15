module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  collectCoverageFrom: ['**/*.(t|j)s'],
  testEnvironment: 'node',
  testTimeout: 9000,
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/main/**',
    '!**/test/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: ['.+\\.test\\.ts$', '.*\\.spec\\.ts$'],
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/modules/$1', // Adjusted path
    '^@shared/(.*)$': '<rootDir>/modules/shared/$1', // Adjusted path
    '^@shared-common/(.*)$': '<rootDir>/modules/shared/common/$1', // Adjusted path
    '^@config/(.*)$': '<rootDir>/config/$1', // Adjusted path
    '^@utils/(.*)$': '<rootDir>/utils/$1', // Adjusted path
    '^@app/(.*)$': '<rootDir>/$1',
  },
};
