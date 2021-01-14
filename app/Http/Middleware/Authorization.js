const Middleware = require('../../../vendor/Middleware');
const AuthUser = require('./AuthUser');

class Authorization extends Middleware {
  constructor() {
    super();
  }

  auth = (req, res, next) => {
    return this.verifyToken(req, res, next);
  }

  login = async (req, res) => {
    const user = await AuthUser.login(req.body);
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    req.body.payload = { ...user };
    return this.signToken(req, res);
  }

  sign = (req, res, next) => {
    return this.signToken(req, res, next);
  }

}

module.exports = new Authorization();
