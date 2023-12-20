module.exports = {
  "testEnvironment": "jsdom",
  "moduleNameMapper": {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/src/components/static_images",
  ],
};