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

    const DocsPath = path.join(__dirname, '../../docs/index.json');
    const DocsSpecs = JSON.stringify(this.specs, null, 2);

    fs.unlink(DocsPath, () => {
      fs.writeFileSync(DocsPath, DocsSpecs);

      // clear();
      console.log(chalk.green.bold(`[NodeMVC]: Documentation specs file successfully created.`));
    });
  }
}

module.exports = Docs;
