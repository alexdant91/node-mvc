const fs = require('fs');
const path = require('path');
const clear = require('clear');

class Docs {
  constructor(Route) {
    this.specs = [];
    this.routes = [].concat.apply([], Route.getRoutes());
  }

  generateSpecs = () => {
    this.routes.forEach(route => {
      let s = { [route.path]: [] };
      const params = route.path.split(':');
      params.splice(0, 1);
      route.methods.forEach(method => {
        s[route.path].push({
          [method]: {
            title: "",
            description: "",
            authorization: "",
            headers: {},
            schema: {},
            query: {
              type: "",
              name: "",
              description: ""
            },
            params: params.map(param => ({
              type: "",
              name: param,
              description: ""
            }))
          }
        });
      });
      this.specs.push(s);
    });

    this.specs = `module.exports = ${JSON.stringify(this.specs, null, 2)}`;

    const DocsMapName = 'index.map.js';
    const DocsPath = path.join(__dirname, '../../docs/');
    const DocsMap = path.join(DocsPath, DocsMapName);
    const DocsSpecs = this.specs;

    fs.unlink(DocsMap, () => {
      fs.writeFileSync(DocsMap, DocsSpecs);

      // clear();
      console.log(chalk.green.bold(`[NodeMVC]: Documentation specs file successfully created.`));
    });
  }
}

module.exports = Docs;
