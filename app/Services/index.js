const fs = require('fs');
const path = require('path');

const folders = fs.readdirSync(path.join(__dirname, '../Services'));

const exportObj = {};

/**
 * Export all Services
 */

const recrusiveExport = (pathname) => {
  folders.forEach(dir => {
    if (dir !== 'index.js') {
      if (!dir.match(/.js/ig)) {
        const all = {};
        // Find all files inside dir
        const files = fs.readdirSync(path.join(__dirname, pathname, dir));
        files.forEach(file => {
          if (file.match(/.js/ig)) {
            // Files only
            const name = file.replace(/.js/ig, '');
            // all[name] = path.join(__dirname, pathname, dir, file);
            all[name] = require(path.join(__dirname, pathname, dir, file));
          }
        });
        exportObj[dir.toLowerCase()] = all;
        // module.exports[dir.toLowerCase()] = all;
      } else {
        exportObj[dir.toLowerCase()] = require(`./${dir}`);
        // module.exports[dir.toLowerCase()] = require(`./${dir}`);
      }
    }
  });
}

recrusiveExport('../Services');

module.exports = exportObj;

/**
 * This can be inport with a structure like
 *
 * Services:
 *  |-- Auth
 *    |-- AuthUser.js
 *    |-- AuthCLient.js
 *  |-- ServiceName
 *    |-- ServiceNameUser.js
 *    |-- ServiceNameClient.js
 *
 * That will result in:
 *
 * module.exports = {
 *    Auth: {
 *      AuthUser: require('../Services/Auth/AuthUser'),
 *      AuthCLient: require('../Services/Auth/AuthCLient')
 *    },
 *    ServiceName: {
 *      ServiceNameUser: require('../Services/ServiceName/ServiceNameUser'),
 *      ServiceNameCLient: require('../Services/ServiceName/ServiceNameCLient')
 *    },
 * };
 *
 * So it can be imported like:
 *
 * const { AuthUser } = include("app.services").Auth;
 *
 * Or in a traditional way:
 *
 * const { AuthUser } = reuquire("/path/to/app/Services").Auth;
 *
 * You can of course import all services separated with:
 *
 * const AuthUser = include("app.services.auth.AuthUser");
 *
 * Or, exporting all services inside `../Services/Auth/index.js`:
 *
 * const { AuthUser } = include("app.services.auth");
 *
 */
