const PgSQLAdapter = require('../../Database/adapter/pgsql');

class PgSQLController extends PgSQLAdapter {
  constructor(modelName) {
    super(modelName);
  }
}

module.exports = PgSQLController;
