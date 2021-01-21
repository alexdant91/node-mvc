require('dotenv').config();
const clear = require('clear');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { exit } = require('process');

clear();

const ModelName = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1)

if (!ModelName || ModelName == "") {
  console.log(chalk.red.bold(`[NodeMVC]: Model name required, run \`yarn make:model [MODEL_NAME]\``));
  exit(0);
}

const ModelTemplate = require('./templates/model');
const ControllerTemplate = require('./templates/controller');
const DatabaseTemplate = require(`./templates/database.${process.env.DB_CONNECTION}`);
const TestsTemplate = require('./templates/tests');

const ModelPath = path.join(__dirname, "../../../app/Models/", `${ModelName}.js`);
const ControllerPath = path.join(__dirname, "../../../app/Http/Controllers/", `${ModelName}Controller.js`);
const DatabasePath = path.join(__dirname, "../../../database/models/", `${ModelName}.js`);
const TestsPath = path.join(__dirname, "../../../tests/", `${ModelName.toLowerCase()}.test.js`);

const ModelCode = ModelTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());
const ControllerCode = ControllerTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());
const DatabaseCode = DatabaseTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());
const TestsCode = TestsTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());

fs.writeFileSync(ModelPath, ModelCode);
console.log(chalk.green.bold(`[NodeMVC]: Generating "${ModelName}" Model...`));
fs.writeFileSync(ControllerPath, ControllerCode);
console.log(chalk.green.bold(`[NodeMVC]: Generating "${ModelName}Controller" Controller...`));
fs.writeFileSync(DatabasePath, DatabaseCode);
console.log(chalk.green.bold(`[NodeMVC]: Generating "${ModelName}" Database Schema...`));
fs.writeFileSync(TestsPath, TestsCode);
console.log(chalk.green.bold(`[NodeMVC]: Generating "${ModelName}" Default Tests Suite...`));

console.log(chalk.green.bold(`[NodeMVC]: Operation successfully done.`));
