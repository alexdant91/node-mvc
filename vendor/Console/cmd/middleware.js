require('dotenv').config();

const MiddlewareTemplate = require('./templates/middleware');
const ModelName = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1)

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const MiddlewarePath = path.join(__dirname, "../../../app/Http/Middleware/", `${ModelName}.js`);

const MiddlewareCode = MiddlewareTemplate.split("%__MODEL_NAME__%").join(ModelName);

fs.writeFileSync(MiddlewarePath, MiddlewareCode);

console.log(chalk.green.bold(`[NodeMVC]: Middleware "${ModelName}" successfully created.`));
