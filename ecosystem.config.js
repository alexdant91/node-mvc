require('dotenv').config();

module.exports = {
  apps: [
    {
      name: "app-server",
      script: "npm",
      args: "run start:server",
      exec_mode: "cluster",
    },
    {
      name: "app-ui",
      script: "npm",
      args: "run start:ui",
      exec_mode: "fork",
    },
  ]
}
