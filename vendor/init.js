const chalk = require('chalk');
const { debug } = require('./Console/debug');
require('dotenv').config({ path: '../.env' });
const Database = require('./Database');

const defaultConfigOptions = {
  verbose: process.env.APP_DEBUG     // Output console info about aserver jobs
}

const get = (configName) => {
  const config = {
    db: {
      DB_CONNECTION: process.env.DB_CONNECTION,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_DATABASE: process.env.DB_DATABASE,
    },
    app: {
      APP_NAME: process.env.APP_NAME,
      APP_ENV: process.env.APP_ENV,
      APP_DEBUG: process.env.APP_DEBUG,
      APP_KEY: process.env.APP_KEY,
      APP_URL: process.env.APP_URL,
      APP_PORT: process.env.APP_PORT,
    }
  };

  return config[configName];
}

global.App = { get };

module.exports.init = {
  config(options = { ...defaultConfigOptions }) {
    global.env = process.env;
    global.debug = debug;
    global.log = console.log;
    global.chalk = chalk;

    // Assign default options to global config object
    Object.keys(defaultConfigOptions).forEach(key => {
      if (!options.hasOwnProperty(key)) options[key] = defaultConfigOptions[key];
    });

    global.config = {
      options
    };
  }
}
