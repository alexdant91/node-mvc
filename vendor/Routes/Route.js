class Route {

  constructor() {
    this.express = require('express');
    this.app = this.express();
    this.router = this.express.Router();

    this.map = [];
    this.mapRoutes = [];
  }

  use = (path, fn = null) => {
    if (fn != null) this.app.use(path, fn);
    else this.app.use(path);
    return this;
  };

  set = (setting, val) => {
    this.app.set(setting, val);
    return this;
  };

  get = (path, ...middleware) => {
    this.app.get(path, ...middleware);
    this.map.push({ path, method: 'GET' });
    return this;
  }

  post = (path, ...middleware) => {
    this.app.post(path, ...middleware);
    this.map.push({ path, method: 'POST' });
    return this;
  }

  put = (path, ...middleware) => {
    this.app.put(path, ...middleware);
    this.map.push({ path, method: 'PUT' });
    return this;
  }

  patch = (path, ...middleware) => {
    this.app.patch(path, ...middleware);
    this.map.push({ path, method: 'PATCH' });
    return this;
  }

  delete = (path, ...middleware) => {
    this.app.delete(path, ...middleware);
    this.map.push({ path, method: 'DELETE' });
    return this;
  }

  all = (path, ...middleware) => {
    this.app.all(path, ...middleware);
    this.map.push({ path, method: 'ALL' });
    return this;
  }

  // Router
  Router = {
    get(path, ...middleware) {
      this.router.get(path, ...middleware);
      return this;
    },
    post(path, ...middleware) {
      this.router.post(path, ...middleware);
      return this;
    },
    put(path, ...middleware) {
      this.router.put(path, ...middleware);
      return this;
    },
    patch(path, ...middleware) {
      this.router.patch(path, ...middleware);
      return this;
    },
    delete(path, ...middleware) {
      this.router.delete(path, ...middleware);
      return this;
    },
    all(path, ...middleware) {
      this.router.all(path, ...middleware);
      return this;
    },
  }

  /**
   * @param {string} prefixPath
   * @returns Express routes
   */
  prefix = (prefixPath) => ({
    /**
     * @param {array} routes Array of routes
     * @returns Express routes
     */
    group: (...routes) => {
      this.app.use(prefixPath, ...routes);

      const path = [];
      routes[0].stack.forEach(stack => {
        path.push({
          path: `${prefixPath}${stack.route.path}`,
          methods: Object.keys(stack.route.methods).map(m => m.toUpperCase()),
        });
      });

      this.mapRoutes.push(path);

      return this;
    },
  });

  listen = (port, callback = () => { }) => {
    this.app.listen(port, callback);
    return this;
  }

  getApp = () => {
    return this.app;
  }

  getRouter = () => {
    return this.router;
  }

  getRoutes = () => {
    // Filter routes map
    this.mapRoutes = this.mapRoutes.map((routes, i) => {
      if (i === 0) {
        return routes.map(item => ({ path: item.path.replace('//', '/'), methods: item.methods }));
      } else {
        let previousArraysLength = 0;
        for (let a = i - 2;a >= 0;a -= 1) {
          previousArraysLength += this.mapRoutes[a].length;
        }
        const lastLength = this.mapRoutes[i - 1].length + previousArraysLength;
        routes.splice(0, lastLength)
        return routes;
      }
    });

    return this.mapRoutes;
  }
}

module.exports = new Route();
