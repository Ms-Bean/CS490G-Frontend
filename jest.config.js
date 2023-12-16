module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/react-app/src/setupTests.js"],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  }
};
