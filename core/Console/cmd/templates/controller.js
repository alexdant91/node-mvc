"use strict";module.exports="const Models = include(\"app.core.models\");;\n\nclass %__MODEL_NAME__%Controller extends Models {\n  constructor() {\n    super(\"%__MODEL_NAME__%\");\n  }\n\n  /* Set all controllers here */\n  all = async (req, res, next) => {\n    // Set special options\n    // It works only for `findAll` method\n    // E.g. req.saveCache = { save: true, key: \"%__MODEL_MIN_NAME__%\" };\n    // Proceed to query\n    // E.g. this.findAll(req, res);\n  }\n\n  index = async (req, res, next) => {\n    // E.g. this.findById(req, res);\n  }\n\n  search = async (req, res, next) => {\n    // E.g. this.find(req, res);\n  }\n\n  searchOne = async (req, res, next) => {\n    // E.g. this.findOne(req, res);\n  }\n\n  store = async (req, res, next) => {\n    // E.g. this.create(req, res);\n  }\n\n  edit = async (req, res, next) => {\n    // E.g. this.update(req, res);\n  }\n\n  remove = async (req, res, next) => {\n    // E.g. this.delete(req, res);\n  }\n}\n\nmodule.exports = new %__MODEL_NAME__%Controller();\n";