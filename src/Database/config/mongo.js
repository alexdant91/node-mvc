const path = require('path');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const autoPopulate = require('mongoose-autopopulate');

const Schemas = require('../schema/mongo.Schemas');
const InternalSchemas = require('../models');

const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const connect = (cb = () => { }) => {
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if (err) debug.danger(err.message);
    if (env.APP_DEBUG) debug.success(`Database MongoDB successfully connected in ${env.APP_ENV} mode.`, false);
    if (typeof cb === "function") return cb(err);
  });
}

const asyncConnect = async () => {
  try {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
  } catch (err) {
    throw err;
  }
}

const disconnect = async () => {
  try {
    await mongoose.connection.close()
    await mongoose.disconnect()
  } catch (err) {
    throw err;
  }
}

const models = {};
const internalModels = {};

Schemas.forEach(model => {
  const { name, schema } = model;
  schema.plugin(autoPopulate);
  schema.plugin(mongoosePaginate);
  models[name] = mongoose.model(name, schema);
});

// Internal models
InternalSchemas.forEach(schema => {
  const { name, model } = schema;
  internalModels[name] = model;
})

// Override internal models
module.exports = { connect, asyncConnect, disconnect, models: { ...internalModels, ...models } };

