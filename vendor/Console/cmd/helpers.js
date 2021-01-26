require('dotenv').config();

const processArgv = () => {
  process.argv.splice(0, 2);

  const argv = process.argv;

  const config = {};

  const commandMap = {
    m: "migrate",
    M: "migrate",
    n: "name",
    N: "name",
    S: "subfolder",
    sub: "subfolder",
  }

  let sub;
  argv.forEach((arg, i) => {
    if (i == 0 && !arg.startsWith('-')) {
      arg = arg == 'true' ? true : arg;
      arg = arg == 'false' ? false : arg;
      config.name = arg;
    } else {
      if (arg.startsWith('-')) {
        const key = arg.replace(/-|--/ig, '');
        if (commandMap[key]) sub = commandMap[key];
        else sub = key;
        config[sub] = true;
      } else {
        arg = arg == 'true' ? true : arg;
        arg = arg == 'false' ? false : arg;
        config[sub] = arg;
      }
    }
  });

  return config;
}

module.exports.processArgv = processArgv;


const migrate = () => {
  const fs = require('fs');
  const path = require('path');
  const chalk = require('chalk');
  const pluralize = require('pluralize');
  const { exit } = require('process');

  if (process.env.DB_CONNECTION === "mongo") {
    const { Imports, PartialSchema, PartialExports, PartialExportsExport, SchemasTemplate } = require('./templates/schemas');

    const SchemaPath = path.join(__dirname, `../../../vendor/Database/schema/${process.env.DB_CONNECTION}.Schemas.js`);
    const ModelsDirPath = path.join(__dirname, `../../../database/models`);

    const files = fs.readdirSync(ModelsDirPath);

    let ImportsCode = Imports, PartialSchemaCodes = [], PartialExportsCodes = [];

    for (file of files) {
      const ModelName = file.replace(".js", "");
      PartialSchemaCodes.push(PartialSchema.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase()));
      PartialExportsCodes.push(PartialExports.split("%__MODEL_NAME__%").join(ModelName).split("%__MODEL_MIN_NAME__%").join(ModelName.toLowerCase()));
      console.log(chalk.green.bold(`[NodeMVC]: Migrating "${ModelName}" schema...`));
    }

    PartialExportsExportCode = PartialExportsExport.replace("%__PARTIAL_EXPORTS__%", PartialExportsCodes.join(""));

    const SchemasCode = SchemasTemplate.split("%__IMPORTS__%").join(ImportsCode).split("%__SCHEMAS__%").join(PartialSchemaCodes.join("")).split("%__PARTIAL__%").join(PartialExportsExportCode);

    fs.unlinkSync(SchemaPath);
    fs.writeFileSync(SchemaPath, SchemasCode);

    console.log(chalk.green.bold(`[NodeMVC]: Migration successfully done.`));
  } else if (process.env.DB_CONNECTION === "pgsql") {
    const { connect, client } = require('../../Database/config/pgsql');


    (async () => {
      await connect();

      fs.readdir(path.join(__dirname, '../../../database/models'), async (err, files) => {
        if (err) {
          console.log(chalk.red.bold(`[NodeMVC]: Error on migration.`));
          throw err;
        }

        let index = 0;
        let done = false;
        for (file of files) {
          index++;
          const tablesModel = require(`../../../database/models/${file}`)();
          const table = pluralize(file.replace('.js', '').toLowerCase());
          const fields = Object.keys(tablesModel).map(key => {
            const name = key;
            const column = tablesModel[key];
            const unique = column.unique ? ' UNIQUE' : '';
            const isNull = column.default && column.default === null ? ' NULL' : ` NOT NULL`;
            const defaultValue = column.default ? ` DEFAULT ${column.default}` : '';
            let type;

            if (column.type === String) {
              if (column.length <= 255) {
                type = `VARCHAR(${column.length})`;
              } else {
                type = `TEXT`;
              }
            } else if (column.type === Number) {
              type = 'DECIMALS'
            } else if (column.type === Boolean) {
              type = 'BOOLEAN'
            } else if (column.type === Date) {
              type = 'DATE'
            }

            return `${name} ${type}${unique}${isNull}${defaultValue}`;
          });

          // console.log(`CREATE TABLE IF NOT EXISTS ${table} (id SERIAL, ${fields.join(", ")})`)
          // console.log(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS ${fields.join(", ADD COLUMN IF NOT EXISTS ")}`)

          client.query(`CREATE TABLE IF NOT EXISTS ${table} (id SERIAL, ${fields.join(", ")})`, (err) => {
            if (err) throw err;
            client.query(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS ${fields.join(", ADD COLUMN IF NOT EXISTS ")}`, (err) => {
              if (err) throw err;

              console.log(chalk.green.bold(`[NodeMVC]: Migrating table "${table}"...`));
              if (index == files.length) {
                done = true;
              }
            });
          });


          let timer = setInterval(() => {
            if (done == true) {
              clearInterval(timer);
              console.log(chalk.green.bold(`[NodeMVC]: Migration successfully done.`));
              exit(0);
            }
          }, 100)
        };

      });

    })()

  } else if (process.env.DB_CONNECTION === "mysql") {
    // TODO: MySql migration here

    console.log(chalk.green.bold(`[NodeMVC]: Migration successfully done.`));
  }
}

module.exports.migrate = migrate;
