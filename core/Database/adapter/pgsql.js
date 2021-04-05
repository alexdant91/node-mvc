require('dotenv').config();
const { client } = require(`../../../core/Database/config/pgsql`);

class PgSQLAdapter {
  constructor(modelName) {
    this.modelName = modelName;
    this.Model = modelName ? require(`../../../app/Models/${this.modelName}`) : { hash: [], exclude: [] };
    this.fieldsToHash = this.Model.hash;
    this.fieldsToExclude = this.Model.exclude;
    this.Client = client;
  }

  getUserToken = (req) => {
    return req.headers['authorization'] ? req.headers['authorization'].split('Bearer ')[1] : false;
  }

  /**
   * @param {string} _id
   *
   * Find one model entity from db by `id` value.
   */
  findById = async (_id) => {
    const where = 'id = $1';
    const values = [_id];

    if (_id) {
      try {
        const { rows } = await this.Client.query(`SELECT * FROM ${this.modelName} WHERE ${where}`, values);
        return rows[0];
      } catch (err) {
        debug.danger(err.message);
        return { error: err.message };
      }
    } else {
      debug.danger("Missing required field `id` on `findOne` model. You can provide it on request body or query.");
      return { error: "Missing required field `id` on `findOne` model. You can provide it on request body or query." };
    }
  }

  /**
   * @param {object} findObj Object contains property to find
   *
   * Find one model entity from db by `find` value.
   */
  findOne = async (findObj = {}) => {
    const where = Object.keys(findObj).map((key, i) => `${key} = $${i + 1}`).join(" AND ");
    const values = Object.keys(findObj).map(key => findObj[key]);

    try {
      const { rows } = await this.Client.query(`SELECT * FROM ${this.modelName} WHERE ${where}`, values);
      return rows[0];
    } catch (err) {
      debug.danger(err.message);
      return { error: "Internal Server Error." };
    }
  }

  /**
   * @param {object} findObj Object contains property to find
   *
   * Find multiple model entities from db by `find` value.
   */
  find = async (findObj = {}) => {
    const where = Object.keys(findObj).map((key, i) => `${key} = $${i + 1}`).join(" AND ");
    const values = Object.keys(findObj).map(key => findObj[key]);

    try {
      const { rows } = await this.Client.query(`SELECT * FROM ${this.modelName} WHERE ${where}`, values);
      return rows;
    } catch (err) {
      debug.danger(err.message);
      return { error: "Internal Server Error." };
    }
  }

  /**
   *
   * Find all entity documents from db.
   */
  findAll = async () => {
    try {
      const { rows } = await this.Client.query(`SELECT * FROM ${this.modelName}`);
      return rows;
    } catch (err) {
      debug.danger(err.message);
      return { error: "Internal Server Error." };
    }
  }

  /**
  * @param {object} findObj Object contains property to find
  *
  * Paginate multiple model entities from db by `find` value.
  */
  paginate = async (findObj = {}, options = { page: 1, limit: 12 }) => {
    if (!options.page) options.page = 1;
    if (!options.limit) options.limit = 12;

    const where = Object.keys(findObj).map((key, i) => `${key} = $${i + 1}`).join(" AND ");
    const values = Object.keys(findObj).map(key => findObj[key]);

    try {
      const { rows } = await this.Client.query(`SELECT * FROM ${this.modelName} WHERE (${where}) LIMIT ${options.limit} OFFSET ${(options.page - 1) * options.limit}`, values);
      return {
        results: rows,
        page: options.page,
        limit: options.limit,
      };
    } catch (err) {
      debug.danger(err.message);
      return { error: "Internal Server Error." };
    }
  }

  /**
  * @param {object} findObj Object contains property to find
  *
  * Paginate all model entities from db by `find` value.
  */
  paginateAll = async (options = { page: 1, limit: 12 }) => {
    if (!options.page) options.page = 1;
    if (!options.limit) options.limit = 12;

    try {
      const { rows } = await this.Client.query(`SELECT * FROM ${this.modelName} LIMIT ${options.limit} OFFSET ${(options.page - 1) * options.limit}`);
      return {
        results: rows,
        page: options.page,
        limit: options.limit,
      };
    } catch (err) {
      debug.danger(err.message);
      return { error: "Internal Server Error." };
    }
  }

  /**
  * @param {object} fieldsObj Data to save
  *
  * Create and store one model entity on db.
  */
  create = async (fieldsObj = {}) => {
    const fieldsName = Object.keys(fieldsObj).join(", ");
    const fieldsPlaceholder = Object.keys(fieldsObj).map((_, i) => `$${i + 1}`).join(", ");
    const values = Object.keys(fieldsObj).map(key => fieldsObj[key]);

    try {
      const { rows } = await this.Client.query(`INSERT INTO ${this.modelName} (${fieldsName}) VALUES (${fieldsPlaceholder})`, values);
      return rows[0];
    } catch (err) {
      debug.danger(err.message);
      return { error: "Internal Server Error." };
    }
  };

  /**
  * @param {object} findObj
  * @param {object} fieldsObj Data to update
  *
  * Update one model entity on db.
  */
  update = async (findObj = {}, fieldsObj = {}) => {
    const length = Object.keys(fieldsObj).length;
    const set = Object.keys(fieldsObj).map((key, i) => `${key} = ($${i + 1})`).join(", ");
    const where = Object.keys(findObj).map((key, i) => `${key} = ($${i + 1 + length})`).join(" AND ");
    const valuesSet = Object.keys(fieldsObj).map(key => fieldsObj[key]);
    const valuesWhere = Object.keys(findObj).map(key => findObj[key]);
    const values = valuesSet.concat(valuesWhere);

    try {
      const { rows } = await this.Client.query(`UPDATE ${this.modelName} SET ${set} WHERE ${where}`, values);
      return rows;
    } catch (err) {
      debug.danger(err.message);
      return { error: "Internal Server Error." };
    }
  };

  /**
  * @param {string} _id
  * @param {object} fieldsObj Data to update
  *
  * Update one model entity on db.
  */
  updateById = async (_id, fieldsObj = {}) => {
    const length = Object.keys(fieldsObj).length;
    const set = Object.keys(fieldsObj).map((key, i) => `${key} = ($${i + 1})`).join(", ");
    const where = `id = ($${length + 1})`;
    const valuesSet = Object.keys(fieldsObj).map(key => fieldsObj[key]);
    const valuesWhere = [_id];
    const values = valuesSet.concat(valuesWhere);

    if (_id) {
      try {
        const { rows } = await this.Client.query(`UPDATE ${this.modelName} SET ${set} WHERE ${where}`, values);
        return rows[0];
      } catch (err) {
        debug.danger(err.message);
        return { error: "Internal Server Error." };
      }
    } else {
      debug.danger("Missing required field `id` on `findOne` model.");
      return { error: "Missing required field `id` on `findOne` model." };
    }
  };

  /**
  * @param {object} findObj
  *
  * Delete one model entity on db.
  */
  delete = async (findObj) => {
    const where = Object.keys(findObj).map((key, i) => `${key} = ($${i + 1})`).join(" AND ");
    const values = Object.keys(findObj).map(key => findObj[key]);

    try {
      await this.Client.query(`DELETE FROM ${this.modelName} WHERE ${where}`, values);
      return { error: null, message: `${this.modelName} successfully deleted.` };
    } catch (err) {
      debug.danger(err.message);
      return { error: "Internal Server Error." };
    }
  };

  /**
  * @param {string} _id
  *
  * Delete one model entity on db.
  */
  deleteById = async (_id) => {
    const where = 'id = $1';
    const values = [_id];

    if (_id) {
      try {
        await this.Client.query(`DELETE FROM ${this.modelName} WHERE ${where}`, values);
        return { error: null, message: `${this.modelName} "${_id}" successfully deleted.` };
      } catch (err) {
        debug.danger(err.message);
        return { error: "Internal Server Error." };
      }
    } else {
      debug.danger("Missing required field `id` on `findOne` model.");
      return { error: "Missing required field `id` on `findOne` model." };
    }
  };
}

module.exports = PgSQLAdapter;
