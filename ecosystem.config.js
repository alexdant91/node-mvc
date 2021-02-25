require('dotenv').config();

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: "./app.js",
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
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "node-mvc-admin",
      script: "npm",
      args: "run start:ui:admin",
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ]
}
