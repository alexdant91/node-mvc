const fs = require('fs');
const path = require('path');

class TemplateEngine {

  static Template = (html, variables, options = { tag: { open: "<%", close: "%>" } }) => {
    let re = new RegExp(`${options.tag.open}(.+?)${options.tag.close}`, 'g'),
      reExp = /(^( )?(var|let|const|if|for|else|elseif|switch|case|break|{|}|;))(.*)?/g,
      code = 'with(obj) { let r=[];\n',
      cursor = 0,
      result,
      match;
    const add = function (line, js) {
      js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
        (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
      return add;
    }
    while (match = re.exec(html)) {
      add(html.slice(cursor, match.index))(match[1], true);
      cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
    try { result = new Function('obj', code).apply(variables, [variables]); }
    catch (err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
    return result;
  }

  static findIncludes = (content) => {
    const includes = [];
    const regex = /<%\s?\@inject\((.+?)\)\s?%>/g
    let match = regex.exec(content);

    while (match != null) {
      includes.push(match[1]);
      match = regex.exec(content);
    }

    return includes;
  }

  static injectIncludes = (includes, content, cb = () => { }) => {
    let count = 0;
    for (const filePath of includes) {
      fs.readFile(path.join(__dirname, '../../public/', `${filePath.split("'").join("")}.html`), function (err, cont) {
        const regexp = new RegExp(`<%\\s?\@inject\\(${filePath}\\)\\s?%>`, "g");

        cont = Buffer.from(cont).toString('ascii');

        content = content.replace(regexp, cont);

        count++;
      });
    }

    const timer = setInterval(() => {
      if (count == includes.length) {
        clearInterval(timer);
        if (typeof cb === "function") return cb(content);
      }
    }, 10);
  }

  static init = (Route, opt = { ext: 'html', path: 'public', optionsEngine: { tag: { open: "<%", close: "%>" } } }) => {
    const views = path.join(__dirname, '../../', opt.path);

    Route.engine(opt.ext, function (filePath, options, callback) {
      fs.readFile(filePath, function (err, content) {
        if (err) return callback(new Error(err));

        content = Buffer.from(content).toString('ascii')

        const includes = TemplateEngine.findIncludes(content);

        TemplateEngine.injectIncludes(includes, content, (parsedContent) => {
          const rendered = TemplateEngine.Template(parsedContent, options, opt.optionsEngine);

          return callback(null, rendered);
        });

      });
    });

    Route.set('views', views);
    Route.set('view engine', opt.ext);
  }

}

module.exports.TemplateEngine = TemplateEngine;
