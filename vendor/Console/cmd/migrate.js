require('dotenv').config();
const clear = require('clear');

const { Imports, PartialSchema, PartialExports, PartialExportsExport, SchemasTemplate } = require('./templates/schemas');
// const ModelName = process.argv.slice(2).toString().charAt(0).toUpperCase() + process.argv.slice(2).toString().slice(1)

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const SchemaPath = path.join(__dirname, `../../../vendor/Database/${process.env.DB_CONNECTION}.Schemas.js`);
const ModelsDirPath = path.join(__dirname, `../../../database/models`);

const files = fs.readdirSync(ModelsDirPath);

let ImportsCode = Imports, PartialSchemaCodes = [], PartialExportsCodes = [];

for (file of files) {
  const ModelName = file.replace(".js", "");
  PartialSchemaCodes.push(PartialSchema.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase()));
  PartialExportsCodes.push(PartialExports.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase()));
}

PartialExportsExportCode = PartialExportsExport.replace("%__PARTIAL_EXPORTS__%", PartialExportsCodes.join(""));

const SchemasCode = SchemasTemplate.split("%__IMPORTS__%").join(ImportsCode).split("%__SCHEMAS__%").join(PartialSchemaCodes.join("")).split("%__PARTIAL__%").join(PartialExportsExportCode);

fs.unlinkSync(SchemaPath);
fs.writeFileSync(SchemaPath, SchemasCode);

clear();
console.log(chalk.green.bold(`[NodeMVC]: Migration successfully done.`));
