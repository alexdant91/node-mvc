const Database = require('../Database');
const bcrypt = require('bcryptjs');

class Models extends Database {
  constructor(modelName) {
    super();
    this.modelName = modelName;
    this.Database = new Database();
    this.Model = modelName ? require(`../../app/Models/${this.modelName}`) : { hash: [], exclude: [] };
    this.fieldsToHash = this.Model.hash;
    this.fieldsToExclude = this.Model.exclude;
    this.Models = DBModels;
  }

  /**
   * @param {object} req Request object passed by Express.js
   * @param {object} res Response object passed by Express.js
   * @param {object} next If provided request return next middleware instead of close connection
   *
   * Find one model entity from db by `id` value. You can specify `id` on request params, body, or query as `id: {ID_VALUE}`.
   */
  findById = async (req, res, next = undefined) => {
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    const _id = req.params.id || req.body.id || req.query.id || undefined;
    if (_id) {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? this.fieldsToExclude.join(" -") : null;
      try {
        const results = await DbModel.findOne({ _id }, fieldToExclude, { lean: true });
        if (next) {
          req[this.modelName.toLowerCase()] = results;
          return next();
        }
        res.status(200).json({ [this.modelName.toLowerCase()]: results })
      } catch (err) {
        debug.danger(err.message);
        res.status(500).json({ error: "Internal Server Error." });
      }
    } else {
      debug.danger("Missing required field `id` on `findOne` model. You can provide it on request body or query.");
      res.status(500).json({ error: "Missing required field `id` on `findOne` model. You can provide it on request body or query." })
    }
  }

  /**
   * @param {object} req Request object passed by Express.js
   * @param {object} res Response object passed by Express.js
   * @param {object} next If provided request return next middleware instead of close connection
   *
   * Find one model entity from db by `find` value. You can specify `find` on request body`.
   */
  findOne = async (req, res, next = undefined) => {
    const by = req.body.find || {};
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? this.fieldsToExclude.join(" -") : null;
      const results = await DbModel.findOne(by, fieldToExclude, { lean: true });
      if (next) {
        req[this.modelName.toLowerCase()] = results;
        return next();
      }
      res.status(200).json({ [this.modelName.toLowerCase()]: results })
    } catch (err) {
      debug.danger(err.message);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }

  /**
   * @param {object} req Request object passed by Express.js
   * @param {object} res Response object passed by Express.js
   * @param {object} next If provided request return next middleware instead of close connection
   *
   * Find multiple model entities from db by `find` value. You can specify `find` on request body`.
   */
  find = async (req, res, next = undefined) => {
    const by = req.body.find || {};
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? this.fieldsToExclude.join(" -") : null;
      const results = await DbModel.find(by, fieldToExclude, { lean: true });
      if (next) {
        req[this.modelName.toLowerCase()] = results;
        return next();
      }
      res.status(200).json({ [this.modelName.toLowerCase()]: results })
    } catch (err) {
      debug.danger(err.message);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }

  /**
   * @param {object} req Request object passed by Express.js
   * @param {object} res Response object passed by Express.js
   * @param {object} next If provided request return next middleware instead of close connection
   *
   * Find all model entities from db.
   */
  findAll = async (_, res, next = undefined) => {
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? this.fieldsToExclude.join(" -") : null;
      const results = await DbModel.find({}, fieldToExclude, { lean: true });
      if (next) {
        req[this.modelName.toLowerCase()] = results;
        return next();
      }
      res.status(200).json({ [this.modelName.toLowerCase()]: results })
    } catch (err) {
      debug.danger(err.message);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }

  /**
  * @param {object} req Request object passed by Express.js
  * @param {object} res Response object passed by Express.js
  * @param {object} next If provided request return next middleware instead of close connection
  *
  * Create and store one model entity on db. Payload is taken by request body.
  */
  create = async (req, res, next = undefined) => {
    this.fieldsToHash.forEach(field => { if (req.body.hasOwnProperty(field)) req.body[field] = bcrypt.hashSync(req.body[field], 12); });
    const fields = req.body;
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    try {
      const fieldToExclude = this.fieldsToExclude;
      let results = await new DbModel(fields).save();
      fieldToExclude.forEach(field => delete results[field]);
      if (next) {
        req[this.modelName.toLowerCase()] = results;
        return next();
      }
      res.status(201).json({ [this.modelName.toLowerCase()]: results });
    } catch (err) {
      debug.danger(err.message);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };

  /**
  * @param {object} req Request object passed by Express.js
  * @param {object} res Response object passed by Express.js
  * @param {object} next If provided request return next middleware instead of close connection
  *
  * Update one model entity on db. Payload is taken by request body.
  */
  update = async (req, res, next = undefined) => {
    this.fieldsToHash.forEach(field => { if (req.body.hasOwnProperty(field)) req.body[field] = bcrypt.hashSync(req.body[field], 12); });
    const fields = req.body;
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    const _id = req.params.id || req.body.id || req.query.id || undefined;
    if (_id) {
      try {
        const fieldToExclude = this.fieldsToExclude.length > 0 ? '-' + this.fieldsToExclude.join(" -") : null;
        await DbModel.updateOne({ _id }, fields, { lean: true });
        const results = await DbModel.findOne({ _id }, fieldToExclude, { lean: true });
        if (next) {
          req[this.modelName.toLowerCase()] = results;
          return next();
        }
        return res.status(201).json({ [this.modelName.toLowerCase()]: results });
      } catch (err) {
        debug.danger(err.message);
        res.status(500).json({ error: "Internal Server Error." });
      }
    } else {
      debug.danger("Missing required field `id` on `findOne` model. You can provide it on request body or query.");
      res.status(500).json({ error: "Missing required field `id` on `findOne` model. You can provide it on request body or query." })
    }
  };

  /**
  * @param {object} req Request object passed by Express.js
  * @param {object} res Response object passed by Express.js
  * @param {object} next If provided request return next middleware instead of close connection
  *
  * Delete one model entity on db. Payload is taken by request body.
  */
  delete = async (req, res, next = undefined) => {
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    const _id = req.params.id || req.body.id || req.query.id || undefined;
    if (_id) {
      try {
        await DbModel.deleteOne({ _id });
        if (next) {
          req.delete = {
            error: null,
            message: `${this.modelName} successfully deleted.`,
          }
          return next();
        }
        return res.status(201).json({ error: null, message: `${this.modelName} successfully deleted.` });
      } catch (err) {
        debug.danger(err.message);
        res.status(500).json({ error: "Internal Server Error." });
      }
    } else {
      debug.danger("Missing required field `id` on `findOne` model. You can provide it on request body or query.");
      res.status(500).json({ error: "Missing required field `id` on `findOne` model. You can provide it on request body or query." })
    }
  };
}

module.exports = Models;
