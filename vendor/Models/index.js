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

  findById = async (req, res) => {
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    const _id = req.params.id || req.body.id || req.query.id || undefined;
    if (_id) {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? this.fieldsToExclude.join(" -") : null;
      try {
        const results = await DbModel.findOne({ _id }, fieldToExclude, { lean: true });
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

  findOne = async (by = {}, req, res) => {
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? this.fieldsToExclude.join(" -") : null;
      const results = await DbModel.findOne(by, fieldToExclude, { lean: true });
      res.status(200).json({ [this.modelName.toLowerCase()]: results })
    } catch (err) {
      debug.danger(err.message);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }

  find = async (by = {}, req, res) => {
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? this.fieldsToExclude.join(" -") : null;
      const results = await DbModel.find(by, fieldToExclude, { lean: true });
      res.status(200).json({ [this.modelName.toLowerCase()]: results })
    } catch (err) {
      debug.danger(err.message);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }

  findAll = async (req, res) => {
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    try {
      const fieldToExclude = this.fieldsToExclude.length > 0 ? this.fieldsToExclude.join(" -") : null;
      const results = await DbModel.find({}, fieldToExclude, { lean: true });
      res.status(200).json({ [this.modelName.toLowerCase()]: results })
    } catch (err) {
      debug.danger(err.message);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }

  create = async (req, res) => {
    this.fieldsToHash.forEach(field => { if (req.body.hasOwnProperty(field)) req.body[field] = bcrypt.hashSync(req.body[field], 12); });
    const fields = req.body;
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    try {
      const fieldToExclude = this.fieldsToExclude;
      let results = await new DbModel(fields).save();
      fieldToExclude.forEach(field => delete results[field]);
      res.status(201).json({ [this.modelName.toLowerCase()]: results });
    } catch (err) {
      debug.danger(err.message);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };

  update = async (req, res) => {
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

  delete = async (req, res) => {
    const DbModels = await this.Models;
    const DbModel = DbModels[this.modelName];
    const _id = req.params.id || req.body.id || req.query.id || undefined;
    if (_id) {
      try {
        await DbModel.deleteOne({ _id });
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
