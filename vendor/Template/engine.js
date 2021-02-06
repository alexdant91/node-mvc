module.exports = (html, variables, options = { tag: { open: "<%", close: "%>" } }) => {
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