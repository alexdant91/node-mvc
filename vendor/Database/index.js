require('dotenv').config()
const { all } = require(`../../vendor/Database/config/${process.env.DB_CONNECTION}`)

class Database {
  constructor(DB_CONNECTION) {
    this.db;
    this.DB_CONNECTION = DB_CONNECTION;
  }

  init = async () => {
    this.db = await all();
    return this.db;
  }
}

module.exports = Database;
