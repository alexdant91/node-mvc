require('dotenv').config();
const clear = require('clear');

const EnvTemplate = require('./templates/env');
const AppNameArgv = process.argv.slice(2).toString();

const AppName = AppNameArgv.replace(/controller/ig, "");

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const appKey = require('crypto').randomBytes(48).toString('hex');

const EnvPath = path.join(__dirname, "../../../.env",);

const EnvCode = EnvTemplate.split("%__MODEL_NAME__%").join(AppName).split("%__MODEL_MIN_NAME__%").join(AppName.toLowerCase()).split("%__APP_KEY__%").join(appKey);

fs.unlinkSync(EnvPath);
fs.writeFileSync(EnvPath, EnvCode);

clear();
console.log(chalk.green.bold(`[NodeMVC]: Enviroment for "${AppName}" successfully created.`));
