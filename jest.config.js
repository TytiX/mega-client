module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: 'tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: './reports/coverage/',
  reporters: [
    'default',
    [ 'jest-junit', { outputDirectory: './reports/junit' } ]
  ]
};
