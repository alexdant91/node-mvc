require('dotenv').config();

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: "./server.js",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "node-mvc-ui",
      script: "npm",
      args: "run start:ui",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ]
}
