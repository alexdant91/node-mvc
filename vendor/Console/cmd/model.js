require('dotenv').config();
const clear = require('clear');

const ModelTemplate = require('./templates/model');
const ControllerTemplate = require('./templates/controller');
const DatabaseTemplate = require(`./templates/database.${process.env.DB_CONNECTION}`);
const ModelName = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1)

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const ModelPath = path.join(__dirname, "../../../app/Models/", `${ModelName}.js`);
const ControllerPath = path.join(__dirname, "../../../app/Http/Controllers/", `${ModelName}Controller.js`);
const DatabasePath = path.join(__dirname, "../../../database/models/", `${ModelName}.js`);

const ModelCode = ModelTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());
const ControllerCode = ControllerTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());
const DatabaseCode = DatabaseTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());

fs.writeFileSync(ModelPath, ModelCode);
fs.writeFileSync(ControllerPath, ControllerCode);
fs.writeFileSync(DatabasePath, DatabaseCode);

clear();
console.log(chalk.green.bold(`[NodeMVC]: Model "${ModelName}", Controller "${ModelName}"Controller and DatabaseSchema "${ModelName}" successfully created.`));