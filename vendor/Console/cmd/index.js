const ModelTemplate = require('./templates/model');
const ControllerTemplate = require('./templates/controller');
const DatabaseTemplate = require('./templates/database');
const ModelName = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1)

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const ModelPath = path.join(__dirname, "../../../app/Models/", `${ModelName}.js`);
const ControllerPath = path.join(__dirname, "../../../app/Http/Controllers/", `${ModelName}Controller.js`);
const DatabasePath = path.join(__dirname, "../../../database/models/", `${ModelName}.js`);

const ModelCode = ModelTemplate.split("%__MODEL_NAME__%").join(ModelName);
const ControllerCode = ControllerTemplate.split("%__MODEL_NAME__%").join(ModelName);
const DatabaseCode = DatabaseTemplate.split("%__MODEL_NAME__%").join(ModelName);

fs.writeFileSync(ModelPath, ModelCode);
fs.writeFileSync(ControllerPath, ControllerCode);
fs.writeFileSync(DatabasePath, DatabaseCode);

console.log(chalk.green.bold("[NodeMVC]: Model successfully created."));
