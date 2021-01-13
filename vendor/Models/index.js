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

  getUserToken = (req) => {
    return req.headers['authorization'] ? req.headers['authorization'].split('Bearer ')[1] : false;
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
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = { _id };

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      findObj[Model.modelIdLabel] = user_data._id
    }

    if (_id) {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      try {
        const results = await DbModel.findOne(findObj, fieldToExclude, { lean: true });
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
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = { ...by };

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      findObj[Model.modelIdLabel] = user_data._id
    }
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      const results = await DbModel.findOne(findObj, fieldToExclude, { lean: true });
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
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = { ...by };

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      findObj[Model.modelIdLabel] = user_data._id
    }
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      const results = await DbModel.find(findObj, fieldToExclude, { lean: true });
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
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = {};

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      findObj[Model.modelIdLabel] = user_data._id
    }
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      const results = await DbModel.find(findObj, fieldToExclude, { lean: true });
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
    const user_data = req.decodedToken ? req.decodedToken : false;
    const fieldsObj = { ...fields };

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      fieldsObj[Model.modelIdLabel] = user_data._id
    }

    try {
      const fieldToExclude = this.fieldsToExclude;
      let results = await new DbModel(fieldsObj).save();
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
    const user_data = req.decodedToken ? req.decodedToken : false;
    const fieldsObj = { ...fields };
    const findObj = { _id };

    let Model;
    if (user_data) {
      Model = require(`../../app/Models/${this.modelName}`);
      findObj[Model.modelIdLabel] = user_data._id
      fieldsObj[Model.modelIdLabel] = user_data._id
    }
    if (_id) {
      try {
        const fieldToExclude = this.fieldsToExclude.length > 0 ? '-' + this.fieldsToExclude.join(" -") : null;
        if (user_data) {
          const find = await DbModel.findOne({ _id, [Model.modelIdLabel]: user_data._id });
          if (find != null) {
            await DbModel.updateOne(findObj, fieldsObj, { lean: true });
          } else {
            debug.danger("You are not autorized to update this data.");
            res.status(500).json({ error: "You are not autorized to update this data." });
          }
        } else {
          await DbModel.updateOne({ _id }, fields, { lean: true });
        }
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
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = { _id };

    let Model;
    if (user_data) {
      Model = require(`../../app/Models/${this.modelName}`);
      findObj[Model.modelIdLabel] = user_data._id
    }
    if (_id) {
      try {
        if (user_data) {
          const find = await DbModel.findOne({ _id, [Model.modelIdLabel]: user_data._id });
          if (find != null) {
            await DbModel.deleteOne(findObj);
          } else {
            debug.danger("You are not autorized to delete this data.");
            res.status(500).json({ error: "You are not autorized to delete this data." });
          }
        } else {
          await DbModel.deleteOne(findObj);
        }
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
