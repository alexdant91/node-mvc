require('dotenv').config();
const clear = require('clear');

const MiddlewareTemplate = require('./templates/middleware');
const ModelName = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1)

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const MiddlewarePath = path.join(__dirname, "../../../app/Http/Middleware/", `${ModelName}.js`);

const MiddlewareCode = MiddlewareTemplate.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase());

fs.writeFileSync(MiddlewarePath, MiddlewareCode);

clear();
console.log(chalk.green.bold(`[NodeMVC]: Middleware "${ModelName}" successfully created.`));
