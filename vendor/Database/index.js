require('dotenv').config();
module.exports = require(`./adapter/${process.env.DB_CONNECTION}`);
