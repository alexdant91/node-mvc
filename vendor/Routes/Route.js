class Route {

  constructor() {
    this.express = require('express');
    this.app = this.express();
    this.router = this.express.Router();
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
    return this;
  }

  post = (path, ...middleware) => {
    this.app.post(path, ...middleware);
    return this;
  }

  put = (path, ...middleware) => {
    this.app.put(path, ...middleware);
    return this;
  }

  patch = (path, ...middleware) => {
    this.app.patch(path, ...middleware);
    return this;
  }

  delete = (path, ...middleware) => {
    this.app.delete(path, ...middleware);
    return this;
  }

  all = (path, ...middleware) => {
    this.app.all(path, ...middleware);
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
      return this;
    },
  });

  listen = (port, callback = () => { }) => {
    this.app.listen(port, callback);
    return this;
  }
}

module.exports = new Route();
