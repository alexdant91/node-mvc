require('dotenv').config();
const { models } = require(`../../../core/Database/config/mongo`);

/**
 * @param {string} modelName Model name
 * @param {object} options Model options: `restrictToOwner` if settled restrict operations to data owner (require ownerId)
 */

class MongoAdapter {
  constructor(modelName, options = { restrictToOwner: false, ownerId: null, excludeFields: true }) {
    this.modelName = modelName;
    this.Model = modelName ? require(`../../../app/Models/${this.modelName}`) : { hash: [], exclude: [], modelIdLabel: null };
    this.fieldsToHash = this.Model.hash;
    this.fieldsToExclude = this.Model.exclude;
    this.Models = MongoAdapter.get("models");
    this.DbModel = this.Models[this.modelName];

    this.excludeFields = options.excludeFields;
    this.restrictToOwner = options.restrictToOwner;
    this.ownerId = options.ownerId;
    this.ownerLabelId = this.Model.modelIdLabel;
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
   * @param {object} fieldToExclude
   * @param {object} options
   *
   * Find one model entity from db by `id` value.
   */
  findById = async (_id, fieldToExclude = null, options = {}) => {
    if (_id) {

      const findObj = { _id };

      // If restrict to owner is settled, apply restriction
      if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

      if (this.excludeFields) {
        if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
        else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
        else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
      }

      try {
        return await this.DbModel.findOne(findObj, fieldToExclude, { lean: true, ...options });
      } catch (err) {
        debug.danger(err.message);
        console.log(err);
        return { error: err.message };
      }
    } else {
      debug.danger("Missing required field `id` on `findById` model. You can provide it on request body or query.");
      return { error: "Missing required field `id` on `findById` model. You can provide it on request body or query." };
    }
  }

  /**
   * @param {object} findObj Object contains property to find
   * @param {object} fieldToExclude
   * @param {object} options
   *
   * Find one model entity from db by `find` value.
   */
  findOne = async (findObj = {}, fieldToExclude = null, options = {}) => {

    if (this.excludeFields) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
    }

    // If restrict to owner is settled, apply restriction
    if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

    try {
      return await this.DbModel.findOne(findObj, fieldToExclude, { lean: true, ...options });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
   * @param {object} findObj Object contains property to find
   * @param {object} fieldToExclude
   * @param {object} options
   *
   * Find multiple model entities from db by `find` value.
   */
  find = async (findObj = {}, fieldToExclude = null, options = {}) => {

    if (this.excludeFields) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
    }

    // If restrict to owner is settled, apply restriction
    if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

    try {
      return await this.DbModel.find(findObj, fieldToExclude, { lean: true, ...options });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
   * @param {object} fieldToExclude
   * @param {object} options
   *
   * Find all entity documents from db.
   */
  findAll = async (fieldToExclude = null, options = {}) => {
    const findObj = {};

    if (this.excludeFields) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
    }

    // If restrict to owner is settled, apply restriction
    if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

    try {
      return await this.DbModel.find(findObj, fieldToExclude, { lean: true, ...options });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
   * @param {object} findObj
   * @param {object} fieldToExclude
   * @param {object} options
   *
   * Find and paginate all entity documents from db.
   */
  paginate = async (findObj = {}, fieldToExclude = null, options = { page: 1, limit: 12 }) => {

    if (!options.page) options.page = 1;
    if (!options.limit) options.limit = 12;

    if (this.excludeFields) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
    }

    // If restrict to owner is settled, apply restriction
    if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

    try {
      return await this.DbModel.paginate(findObj, { select: fieldToExclude, ...options, lean: true });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
   * @param {object} findObj
   * @param {object} fieldToExclude
   * @param {object} options
   *
   * Find and paginate all entity documents from db by `find` value.
   */
  paginateAll = async (fieldToExclude = null, options = { page: 1, limit: 12 }) => {
    const findObj = {};

    if (!options.page) options.page = 1;
    if (!options.limit) options.limit = 12;

    if (this.excludeFields) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
    }

    // If restrict to owner is settled, apply restriction
    if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

    try {
      return await this.DbModel.paginate(findObj, { select: fieldToExclude, ...options, lean: true });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  }

  /**
  * @param {object} fieldsObj Data to save
  * @param {object} fieldToExclude
  *
  * Create one model entity on db.
  * Give access to save() function.
  */
  create = async (fieldsObj = {}, fieldToExclude = null) => {
    // Hash fields to hash specified in model
    this.fieldsToHash.forEach(field => { if (fieldsObj.hasOwnProperty(field)) fieldsObj[field] = bcrypt.hashSync(fieldsObj[field], 12); });

    if (this.excludeFields) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
    }

    try {
      return new DbModel(fieldsObj);
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  };

  /**
  * @param {object} fieldsObj Data to save
  * @param {object} fieldToExclude
  *
  * Create and store one model entity on db.
  */
  createAndStore = async (fieldsObj = {}, fieldToExclude = null) => {
    // Hash fields to hash specified in model
    this.fieldsToHash.forEach(field => { if (fieldsObj.hasOwnProperty(field)) fieldsObj[field] = bcrypt.hashSync(fieldsObj[field], 12); });

    if (this.excludeFields) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
    }

    try {
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
  * @param {object} fieldToExclude
  * @param {object} options
  *
  * Update one model entity on db.
  */
  update = async (findObj = {}, fieldsObj = {}, fieldToExclude = null, options = {}) => {
    // Hash fields to hash specified in model
    this.fieldsToHash.forEach(field => { if (fieldsObj.hasOwnProperty(field)) fieldsObj[field] = bcrypt.hashSync(fieldsObj[field], 12); });

    if (this.excludeFields) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
    }

    // If restrict to owner is settled, apply restriction
    if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

    try {
      await this.DbModel.updateOne(findObj, fieldsObj, { lean: true });
      return await this.DbModel.findOne(findObj, fieldToExclude, { lean: true, ...options });
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  };

  /**
  * @param {string} _id
  * @param {object} fieldsObj Data to update
  * @param {object} fieldToExclude
  * @param {object} options
  *
  * Update one model entity on db.
  */
  updateById = async (_id, fieldsObj = {}, fieldsToExclude = null, options = {}) => {
    this.fieldsToHash.forEach(field => { if (fieldsObj.hasOwnProperty(field)) fieldsObj[field] = bcrypt.hashSync(fieldsObj[field], 12); });

    if (_id) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;

      // If restrict to owner is settled, apply restriction
      if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

      try {
        await this.DbModel.updateOne({ _id }, fields, { lean: true });
        return await this.DbModel.findOne({ _id }, fieldToExclude, { lean: true, ...options });
      } catch (err) {
        debug.danger(err.message);
        console.log(err);
        return { error: "Internal Server Error." };
      }
    } else {
      debug.danger("Missing required field `id` on `updateById` model.");
      return { error: "Missing required field `id` on `updateById` model." };
    }
  };

  /**
  * @param {object} findObj
  * @param {object} fieldsObj Data to update
  * @param {object} fieldToExclude
  * @param {object} options
  *
  * Update multiple model entity on db.
  */
  updateMany = async (findObj = {}, fieldsObj = {}, fieldsToExclude = null, options = {}) => {
    this.fieldsToHash.forEach(field => { if (fieldsObj.hasOwnProperty(field)) fieldsObj[field] = bcrypt.hashSync(fieldsObj[field], 12); });

    if (this.excludeFields) {
      if (fieldToExclude != null && typeof fieldToExclude !== "string") fieldsToExclude = fieldsToExclude.length > 0 ? `-${fieldsToExclude.join(" -")}` : null;
      else if (fieldToExclude != null && Array.isArray(fieldToExclude)) fieldsToExclude = `-${fieldsToExclude.join(" -")}`;
      else fieldToExclude = this.fieldsToExclude.length > 0 ? `-${this.fieldsToExclude.join(" -")}` : null;
    }

    // If restrict to owner is settled, apply restriction
    if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

    try {
      await this.DbModel.updateMany(findObj, fields, { lean: true });
      return await this.DbModel.findOne(findObj, fieldToExclude, { lean: true, ...options });
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

    // If restrict to owner is settled, apply restriction
    if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

    try {
      await this.DbModel.deleteOne(findObj);
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
    if (_id) {
      const findObj = { _id };

      // If restrict to owner is settled, apply restriction
      if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

      try {
        await this.DbModel.deleteOne(findObj);
        return { error: null, message: `${this.modelName} successfully deleted.` };
      } catch (err) {
        debug.danger(err.message);
        console.log(err);
        return { error: "Internal Server Error." };
      }
    } else {
      debug.danger("Missing required field `id` on `deleteById` model.");
      return { error: "Missing required field `id` on `deleteById` model." };
    }
  };

  /**
  * @param {object} findObj
  *
  * Delete multiple models entity on db.
  */
  deleteMany = async (findObj) => {

    // If restrict to owner is settled, apply restriction
    if (this.restrictToOwner) findObj[this.ownerLabelId] = this.ownerId;

    try {
      await this.DbModel.deleteMany(findObj);
      return { error: null, message: `${this.modelName} successfully deleted.` };
    } catch (err) {
      debug.danger(err.message);
      console.log(err);
      return { error: "Internal Server Error." };
    }
  };
}

module.exports = MongoAdapter;
