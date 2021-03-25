require('dotenv').config();
const { models } = require(`../../../core/Database/config/mongo`);

class MongoAdapter {
  constructor(modelName) {
    this.modelName = modelName;
    this.Model = modelName ? require(`../../../app/Models/${this.modelName}`) : { hash: [], exclude: [] };
    this.fieldsToHash = this.Model.hash;
    this.fieldsToExclude = this.Model.exclude;
    this.Models = MongoAdapter.get("models");
  }

  static labels = {
    models: models
  }

  static get = (label) => {
    return MongoAdapter.labels[label];
  }

  getUserToken = (req) => {
    return req.headers['authorization'] ? req.headers['authorization'].split('Bearer ')[1] : false;
  }

  /**
   * @param {string} _id
   *
   * Find one model entity from db by `id` value.
   */
  findById = async (_id, fieldToExclude = null) => {
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    const findObj = { _id };

    if (_id) {
      // const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      // const fieldToExclude = null;
      try {
        return await DbModel.findOne(findObj, fieldToExclude, { lean: true });
      } catch (err) {
        debug.danger(err.message);
        console.log(err);
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
  findOne = async (findObj = {}, fieldToExclude = null) => {
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    try {
      // const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      return await DbModel.findOne(findObj, fieldToExclude, { lean: true });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
   * @param {object} findObj Object contains property to find
   *
   * Find multiple model entities from db by `find` value.
   */
  find = async (findObj = {}, fieldToExclude = null) => {
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    try {
      // const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      // const fieldToExclude = null;
      return await DbModel.find(findObj, fieldToExclude, { lean: true });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
   *
   * Find all entity documents from db.
   */
  findAll = async (fieldToExclude = null) => {
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    const findObj = {};

    try {
      // const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      // const fieldToExclude = null;
      return await DbModel.find(findObj, fieldToExclude, { lean: true });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
   *
   * @param {object} findObj
   * @param {object} options
   * Find and paginate all entity documents from db.
   */
  paginate = async (findObj = {}, options = { page: 1, limit: 12 }, fieldToExclude = null) => {
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    if (!options.page) options.page = 1;
    if (!options.limit) options.limit = 12;

    try {
      // const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      // const fieldToExclude = null;
      return await DbModel.paginate(findObj, { select: fieldToExclude, ...options, lean: true });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
   * @param {object} findObj
   * @param {object} options
   * Find and paginate all entity documents from db by `find` value.
   */
  paginateAll = async (options = { page: 1, limit: 12 }, fieldToExclude = null) => {
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    if (!options.page) options.page = 1;
    if (!options.limit) options.limit = 12;

    try {
      // const fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      // const fieldToExclude = null;
      return await DbModel.paginate({}, { select: fieldToExclude, ...options, lean: true });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
  * @param {object} fieldsObj Data to save
  *
  * Create and store one model entity on db.
  */
  create = async (fieldsObj = {}, fieldToExclude = null) => {
    this.fieldsToHash.forEach(field => { if (fieldsObj.hasOwnProperty(field)) fieldsObj[field] = bcrypt.hashSync(fieldsObj[field], 12); });
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    try {
      // const fieldToExclude = this.fieldsToExclude;
      let results = await new DbModel(fieldsObj).save();
      if (fieldToExclude != null) fieldToExclude.forEach(field => delete results[field]);
      return results._doc ? { ...results._doc } : { ...results };
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
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
    this.fieldsToHash.forEach(field => { if (fieldsObj.hasOwnProperty(field)) fieldsObj[field] = bcrypt.hashSync(fieldsObj[field], 12); });
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? '-' + this.fieldsToExclude.join(" -") : null;
      await DbModel.updateOne(findObj, fieldsObj, { lean: true });
      return await DbModel.findOne(findObj, fieldToExclude, { lean: true });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
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
    this.fieldsToHash.forEach(field => { if (fieldsObj.hasOwnProperty(field)) fieldsObj[field] = bcrypt.hashSync(fieldsObj[field], 12); });
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];
    if (_id) {
      try {
        const fieldToExclude = this.fieldsToExclude.length > 0 ? '-' + this.fieldsToExclude.join(" -") : null;
        await DbModel.updateOne({ _id }, fields, { lean: true });
        return await DbModel.findOne({ _id }, fieldToExclude, { lean: true });
      } catch (err) {
        debug.danger(err.message);
        console.log(err);
        return { error: "Internal Server Error." };
      }
    } else {
      debug.danger("Missing required field `id` on `findOne` model.");
      return { error: "Missing required field `id` on `findOne` model." };
    }
  };

  /**
  * @param {object} findObj
  * @param {object} fieldsObj Data to update
  *
  * Update multiple model entity on db.
  */
  updateMany = async (findObj = {}, fieldsObj = {}) => {
    this.fieldsToHash.forEach(field => { if (fieldsObj.hasOwnProperty(field)) fieldsObj[field] = bcrypt.hashSync(fieldsObj[field], 12); });
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? '-' + this.fieldsToExclude.join(" -") : null;
      await DbModel.updateMany(findObj, fields, { lean: true });
      return await DbModel.findOne(findObj, fieldToExclude, { lean: true });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  };

  /**
  * @param {object} findObj
  *
  * Delete one model entity on db.
  */
  delete = async (findObj) => {
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    try {
      await DbModel.deleteOne(findObj);
      return { error: null, message: `${this.modelName} successfully deleted.` };
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  };

  /**
  * @param {string} _id
  *
  * Delete one model entity on db.
  */
  deleteById = async (_id) => {
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    if (_id) {
      try {
        await DbModel.deleteOne({ _id });
        return { error: null, message: `${this.modelName} successfully deleted.` };
      } catch (err) {
        debug.danger(err.message);
        console.log(err);
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
  * Delete multiple models entity on db.
  */
  deleteMany = async (findObj) => {
    const DbModels = this.Models;
    const DbModel = DbModels[this.modelName];

    try {
      await DbModel.deleteMany(findObj);
      return { error: null, message: `${this.modelName} successfully deleted.` };
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  };
}

module.exports = MongoAdapter;
