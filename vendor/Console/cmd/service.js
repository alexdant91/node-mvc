require('dotenv').config();
const clear = require('clear');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const ModelNameArgv = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1);

if (!ModelNameArgv || ModelNameArgv == "") {
  console.log(chalk.red.bold(`[NodeMVC]: Controller name required, run \`yarn make:controller [CONTROLLER_NAME]\``));
  exit(0);
}

const ModelName = ModelNameArgv.replace(/controller/ig, "");

const ServiceTemplate = require('./templates/service');

const ServicePath = path.join(__dirname, "../../../app/Services", `${ModelName}.js`);

const ServiceCode = ServiceTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());

fs.writeFileSync(ServicePath, ServiceCode);

clear();
console.log(chalk.green.bold(`[NodeMVC]: Service "${ModelName}" successfully created.`));
