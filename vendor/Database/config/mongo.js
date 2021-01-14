const path = require('path');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const autoPopulate = require('mongoose-autopopulate');

const Schemas = require('../mongo.Schemas');

const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const connect = () => {
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if (err) debug.danger(err.message);
    if (env.APP_DEBUG) debug.success(`Database MongoDB successfully connected in ${env.APP_ENV} mode.`, false);
  });
}

const models = {};

Schemas.forEach(model => {
  const { name, schema } = model;
  schema.plugin(autoPopulate);
  schema.plugin(mongoosePaginate);
  models[name] = mongoose.model(name, schema);
});

module.exports = { connect, models: { ...models } };

