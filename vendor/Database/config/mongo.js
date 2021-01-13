const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { readdir } = require('fs-promise');

const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const connect = () => {
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if (err) debug.danger(err.message);
    if (env.APP_DEBUG) debug.success("Databse connected.", false);
  });
}

const all = async () => {
  const db = {};
  const files = await readdir(path.join(__dirname, "../../../app/Models"));
  files.forEach(file => {
    const ModelName = file.replace(".js", "");
    const ModelSchema = new Schema(require(`../../../database/models/${ModelName}`)(), { strict: false });
    db[ModelName] = mongoose.model(ModelName, ModelSchema);
  });
  return db;
}

module.exports = { connect, all };

