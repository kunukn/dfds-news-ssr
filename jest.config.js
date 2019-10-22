const { defaults } = require('jest-config')

module.exports = {
  verbose: true,
  setupFilesAfterEnv: [
    '<rootDir>/test/__mocks__/client.js',
    '@testing-library/react/cleanup-after-each',
  ],
  snapshotSerializers: [],
  transform: {
    '^.+\\.(js|jsx|tsx)?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(xcss|xscss)$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  testEnvironment: 'node',
  testURL: 'http://localhost',
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{js,jsx,tsx}',
    '<rootDir>/**/?(*.)(spec|test).{js,jsx,tsx}',
  ],
  setupFiles: ['<rootDir>/test/__mocks__/polyfills.js'],
  roots: ['<rootDir>'],
  modulePaths: [],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['js', 'jsx', 'tsx', 'css', 'scss'],
  transformIgnorePatterns: [],
}
