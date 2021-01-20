const Database = require('../../Database');
const Cache = require('../../../cache/Cache');
const bcrypt = require('bcryptjs');

class Models {
  constructor(modelName) {
    this.modelName = modelName;
    this.Model = modelName ? require(`../../../app/Models/${this.modelName}`) : { hash: [], exclude: [] };
    this.fieldsToHash = this.Model.hash;
    this.fieldsToExclude = this.Model.exclude;
    this.Models = Database.get("models");
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
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    const _id = req.params.id || req.body.id || req.query.id || undefined;
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = { _id };

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      if (this.modelName !== "User") findObj[Model.modelIdLabel] = user_data._id
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
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = { ...by };

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      if (this.modelName !== "User") findObj[Model.modelIdLabel] = user_data._id
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
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = { ...by };

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      if (this.modelName !== "User") findObj[Model.modelIdLabel] = user_data._id
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
  findAll = async (req, res, next = undefined) => {
    // Set special options
    const specialOptions = { saveCache: req.saveCache ? req.saveCache : { save: false } };
    if (specialOptions.saveCache.save && specialOptions.saveCache.refresh === undefined) specialOptions.saveCache.refresh = true;
    if (specialOptions.saveCache.save && specialOptions.saveCache.refreshInterval === undefined) specialOptions.saveCache.refreshInterval = 1 * 60 * 60 * 24 * 1000;
    //
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = {};

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      if (this.modelName !== "User") findObj[Model.modelIdLabel] = user_data._id
    }
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      const results = await DbModel.find(findObj, fieldToExclude, { lean: true });
      if (specialOptions && specialOptions.saveCache.save) {
        const { key, refresh, refreshInterval } = specialOptions.saveCache;
        if (refresh) {
          const timers = Cache.get(['private', 'timers', key]);
          if (timers && timers.lastUpdate + refreshInterval > Date.now()) {
            // Do refresh
            await Cache.set(key, { [this.modelName.toLowerCase()]: [...results] });
          } else if (!timers) {
            await Cache.set(key, { [this.modelName.toLowerCase()]: [...results] });
          }
        } else {
          // Do refresh
          const findCache = Cache.get(key);
          if (!findCache) {
            await Cache.set(key, { [this.modelName.toLowerCase()]: [...results] });
          }
        }
      }
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
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    const user_data = req.decodedToken ? req.decodedToken : false;
    const fieldsObj = { ...fields };

    if (user_data) {
      const Model = require(`../../app/Models/${this.modelName}`);
      if (this.modelName !== "User") fieldsObj[Model.modelIdLabel] = user_data._id
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
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    const _id = req.params.id || req.body.id || req.query.id || undefined;
    const user_data = req.decodedToken ? req.decodedToken : false;
    const fieldsObj = { ...fields };
    const findObj = { _id };

    let Model;
    if (user_data) {
      Model = require(`../../app/Models/${this.modelName}`);
      if (this.modelName !== "User") findObj[Model.modelIdLabel] = user_data._id
      if (this.modelName !== "User") fieldsObj[Model.modelIdLabel] = user_data._id
    }
    if (_id) {
      try {
        const fieldToExclude = this.fieldsToExclude.length > 0 ? '-' + this.fieldsToExclude.join(" -") : null;
        if (user_data) {
          const find = await DbModel.findOne(findObj, null, { lean: true });
          if (find != null) {
            await DbModel.updateOne(findObj, fieldsObj, { lean: true });
          } else {
            debug.danger("You are not autorized to update this data.");
            return res.status(500).json({ error: "You are not autorized to update this data." });
          }
        } else {
          await DbModel.updateOne({ _id }, fields, { lean: true });
        }
        const results = await DbModel.findOne({ _id }, fieldToExclude, { lean: true });
        if (next) {
          req[this.modelName.toLowerCase()] = results;
          return next();
        }
        return res.status(200).json({ [this.modelName.toLowerCase()]: results });
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
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    const _id = req.params.id || req.body.id || req.query.id || undefined;
    const user_data = req.decodedToken ? req.decodedToken : false;
    const findObj = { _id };

    let Model;
    if (user_data) {
      Model = require(`../../app/Models/${this.modelName}`);
      if (this.modelName !== "User") findObj[Model.modelIdLabel] = user_data._id
    }
    if (_id) {
      try {
        if (user_data) {
          const find = await DbModel.findOne(findObj, null, { lean: true });
          console.log(DbModel, findObj)
          if (find != null) {
            await DbModel.deleteOne(findObj);
          } else {
            debug.danger("You are not autorized to delete this data.");
            return res.status(500).json({ error: "You are not autorized to delete this data." });
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
        return res.status(200).json({ error: null, message: `${this.modelName} successfully deleted.` });
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
