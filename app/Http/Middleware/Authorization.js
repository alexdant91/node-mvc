const Middleware = require('../../../vendor/Middleware');

class Authorization extends Middleware {
  constructor() {
    super();
  }

  auth = (req, res, next) => {
    return this.verifyToken(req, res, next);
  }

  sign = (req, res, next) => {
    return this.signToken(req, res, next);
  }

}

module.exports = new Authorization();
