const fs = require('fs');
const path = require('path');

/**
 *
 * @param {string} pathname String separated by point character
 * @returns Required module
 */
const include = (pathname) => {
  const pathMap = {
    app: {
      "services": {
        "auth": path.join(__dirname, '../../app/Services/Auth'),
      },
      "helpers": path.join(__dirname, '../../app/Helpers'),
      "http": {
        "controllers": path.join(__dirname, '../../app/Http/Controllers'),
        "middleware": path.join(__dirname, '../../app/Http/Middleware'),
      },
      "models": path.join(__dirname, '../../app/Models'),
      "providers": path.join(__dirname, '../../app/Providers'),
      "routes": {
        "routes": path.join(__dirname, '../../app/Routes'),
        "groups": path.join(__dirname, '../../app/Routes/Groups'),
      },
      "core": {
        "models": path.join(__dirname, '../Models'),
        "database": path.join(__dirname, '../Database'),
        "middleware": path.join(__dirname, '../Middleware'),
        "docs": path.join(__dirname, '../Docs'),
        "exceptions": {
          "exception": path.join(__dirname, '../Exceptions/Exception'),
          "httpexception": path.join(__dirname, '../Exceptions/HTTPException'),
        },
        "cache": path.join(__dirname, '../../cache/Cache'),
      }
    },
  }

  if (!pathname.match(/^\w+(?:\.\w+)*$/)) {
    throw new Error("Incorrect `pathname` format, you need to sepate words by a point. E.g. \"app.http.controllers\"");
  }

  pathname = pathname.split(".");
  let dir = pathname[0].toLowerCase() != "app" ? pathMap.app : pathMap;

  pathname.forEach(p => {
    if (!dir[p.toLowerCase()]) {
      dir = `${dir}/${p}`;
    } else {
      dir = dir[p.toLowerCase()];
    }
  });

  if (fs.existsSync(`${dir}`) || fs.existsSync(`${dir}.js`) || fs.existsSync(`${dir}/index.js`)) {
    return require(dir);
  } else {
    throw new Error(`Module "${pathname}" not found.`);
  }
}

module.exports.include = include;
