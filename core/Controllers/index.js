const Models = require('./mongo');

const Model = require(`./${process.env.DB_CONNECTION}`);
module.exports = Model;
