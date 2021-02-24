const { Client } = require('pg');
const chalk = require('chalk');

// Pool logic, requiring connect() before queryng
// const client = new Pool({
//   host: env.DB_HOST,
//   port: env.DB_PORT,
//   database: env.DB_DATABASE,
//   user: env.DB_USERNAME,
//   password: env.DB_PASSWORD,
// });

// Client logic
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
})

const connect = async () => {
  try {
    await client.connect()
    if (process.env.APP_DEBUG) console.log(chalk.green(`Database PostgresSQL successfully connected in ${process.env.APP_ENV} mode.`));
  } catch (err) {
    console.log(chalk.red(err.message));
    throw err;
  }
}

const asyncConnect = async () => {
  try {
    await client.connect()
    if (process.env.APP_DEBUG) console.log(chalk.green(`Database PostgresSQL successfully connected in ${process.env.APP_ENV} mode.`));
  } catch (err) {
    console.log(chalk.red(err.message));
    throw err;
  }
};

const disconnect = async () => {
  try {
    return await client.end();
  } catch (err) {
    throw err;
  }
}

module.exports = { connect, asyncConnect, disconnect, client };
