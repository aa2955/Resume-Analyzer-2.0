module.exports = {
  // Specifies the root of your tests
  roots: ['<rootDir>/src'],

  // File extensions to process
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // Transform files using Babel or other transformers
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest to transpile files
  },

  // Ignore specific node_modules unless explicitly listed
  transformIgnorePatterns: [
    'node_modules/(?!react-pdf|pdfjs-dist/)', // Add exceptions here
  ],

  // Map static assets to mocks
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock CSS files
    '\\.(jpg|jpeg|png|gif|svg|eot|otf|webp|woff|woff2|ttf|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js', // Mock static assets
  },

  // Environment setup for the tests
  testEnvironment: 'jsdom',

  // Automatically clear mocks between tests
  clearMocks: true,

  // Path to setup files that should run before tests
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Collect coverage information
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Collect coverage from these file types
    '!src/**/*.test.{js,jsx,ts,tsx}', // Exclude test files
    '!src/index.{js,jsx,ts,tsx}', // Exclude entry points
    '!src/serviceWorker.js', // Exclude service worker
  ],
  coverageDirectory: '<rootDir>/coverage',

  // Coverage thresholds (optional)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Handle timers in tests
  timers: 'modern',
};
