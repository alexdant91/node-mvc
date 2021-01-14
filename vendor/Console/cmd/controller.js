require('dotenv').config();
const clear = require('clear');

const ControllerTemplate = require('./templates/controllerOnly');
const ModelNameArgv = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1);

const ModelName = ModelNameArgv.replace(/controller/ig, "");

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const ControllerPath = path.join(__dirname, "../../../app/Http/Controllers/", `${ModelName}Controller.js`);

const ControllerCode = ControllerTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());

fs.writeFileSync(ControllerPath, ControllerCode);

clear();
console.log(chalk.green.bold(`[NodeMVC]: Controller "${ModelName}" successfully created.`));
