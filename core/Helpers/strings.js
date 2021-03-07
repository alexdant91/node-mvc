const pluralize = require('pluralize');

const isUpperCase = (str) => {
  return str.match(/[A-Z]/) != null;
}

const camelCaseToPath = (str, options = { pluralizeResult: false }) => {
  const r = [];
  const a = str.split("");
  a.forEach((l, i) => {
    if (isUpperCase(l)) r.push('/');
    r.push(l.toLowerCase());
  });

  if (r[0] == "/") r.shift();

  return options.pluralizeResult ? pluralize(r.join("")) : r.join("");
}

const snakeCaseToPath = (str, options = { pluralizeResult: false }) => {
  const r = [];
  const a = str.split("");
  a.forEach((l, i) => {
    if (l == "_") r.push('/');
    else r.push(l.toLowerCase());
  });

  if (r[0] == "/") r.shift();

  return options.pluralizeResult ? pluralize(r.join("")) : r.join("");
}

module.exports = {
  isUpperCase,
  camelCaseToPath,
  snakeCaseToPath
}
