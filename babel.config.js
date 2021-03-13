module.exports = {
  presets: [
    "@babel/preset-env",
    "minify"
  ],
  plugins: [
    "@babel/plugin-syntax-class-properties",
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-transform-runtime", { "regenerator": true }]
  ],
  ignore: [
    ".env",
    "test",
    "**/*.test.js",
    "babel.config.js",
    "ecosystem.config.js",
    "dump.rdb",
    "node_modules",
    "resource",
    "database",
  ]
}
