const path = require('path');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const autoPopulate = require('mongoose-autopopulate');

const Schemas = require('../schema/mongo.Schemas');
const InternalSchemas = require('../models');

const { DB_HOST, DB_PORT, DB_DATABASE, DB_CONNECTION_URI } = process.env;

const CONNECTION_URI = DB_CONNECTION_URI != null && DB_CONNECTION_URI != undefined ? DB_CONNECTION_URI : `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const connect = (cb = () => { }) => {
  mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if (err) debug.danger(err.message);
    if (env.APP_DEBUG) debug.success(`Database MongoDB successfully connected in ${env.APP_ENV} mode.`, false);
    if (typeof cb === "function") return cb(err);
  });
}

const asyncConnect = async () => {
  try {
    await mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
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

