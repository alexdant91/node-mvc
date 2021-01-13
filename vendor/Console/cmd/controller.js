require('dotenv').config();

const ControllerTemplate = require('./templates/controllerOnly');
const ModelNameArgv = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1);

const ModelName = ModelNameArgv.replace(/controller/ig, "");

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const ControllerPath = path.join(__dirname, "../../../app/Http/Controllers/", `${ModelName}Controller.js`);

const ControllerCode = ControllerTemplate.split("%__MODEL_NAME__%").join(ModelName);

fs.writeFileSync(ControllerPath, ControllerCode);

console.log(chalk.green.bold(`[NodeMVC]: Controller "${ModelName}" successfully created.`));
