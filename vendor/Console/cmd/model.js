require('dotenv').config();
const clear = require('clear');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { exit } = require('process');
const { processArgv } = require('./helpers');

clear();

console.log(chalk.green.bold(`[NodeMVC]: Generating new Model...`));

const options = processArgv();

const Name = options.name;
const SubDir = options.subfolder ? options.subfolder : '/';

const ModelName = Name ? Name.charAt(0).toUpperCase() + Name.slice(1) : process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1);

// const ModelName = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1)

if (!ModelName || ModelName == "") {
  console.log(chalk.red.bold(`[NodeMVC]: Model name required, run \`yarn make:model [MODEL_NAME]\``));
  exit(0);
}

const ModelTemplate = require('./templates/model');

const ModelSubPath = path.join(__dirname, "../../../app/Models", SubDir);

if (!fs.existsSync(ModelSubPath)) fs.mkdirSync(ModelSubPath);

const ModelPath = path.join(ModelSubPath, `${ModelName}.js`);

// const ModelPath = path.join(__dirname, "../../../app/Models/", `${ModelName}.js`);

const ModelCode = ModelTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());

fs.writeFileSync(ModelPath, ModelCode);

console.log(chalk.green.bold(`[NodeMVC]: Generating "${ModelName}" Model...`));

console.log(chalk.green.bold(`[NodeMVC]: Operation successfully done.`));
