require('dotenv').config();
const { APP_KEY, APP_NAME } = process.env;
const jwt = require('jsonwebtoken');
const Database = require('../Database');
const { getModelExcludeString } = require('../Helpers/models');

class Middleware {
  constructor() {
    this._app_key = APP_KEY;
    this._app_name = APP_NAME;
    this._tokenApp = null;
    this._isSetupDone = false;
    this._tokenPayload;
    this._tokenOptions;
  }

  setupToken = (payload = {}, options = { expiresIn: undefined, issuer: undefined }) => {
    if (!options.expiresIn) options.expiresIn = '2days';
    if (!options.issuer) options.issuer = this._app_name;
    this._tokenPayload = payload;
    this._tokenOptions = options;
    this._isSetupDone = true;
    return this;
  }

  signToken = (req, res, options = { mergeValue: null }, next = undefined) => {
    delete req.body.payload.password
    const tokenPayload = req.body.payload;

    if (options.mergeValue != null && typeof options.mergeValue !== "object") throw new Error("Data type error, `options.mergeValue` need to be `null | Object`");

    if (tokenPayload) {
      this.setupToken(tokenPayload);
      if (this._isSetupDone) {
        const token = jwt.sign(this._tokenPayload, this._app_key, { expiresIn: this._tokenOptions.expiresIn, issuer: this._tokenOptions.issuer });
        this._tokenApp = token;
        if (next) {
          req.token = token;
          return next();
        }
        if (options.mergeValue == null) return res.status(200).json({ token });
        else return res.status(200).json({ token, ...options.mergeValue });
      }
      debug.danger("You need to call `setupToken` method before processing token.");
      return res.status(500).json({ error: "Internal Server Error." });
    }
    debug.danger("Missing required field `payload` on request. It must contain token payload to sign.");
    return res.status(500).json({ error: "Missing required field `payload` on request. It must contain token payload to sign." });
  }

  verifyToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
      debug.danger("Missing required field `Authorization` on request headers. It must contain `Bearer {token}`.");
      return res.status(500).json({ error: "Missing required field `Authorization` on request headers. It must contain `Bearer {token}`." });
    }

    const token = req.headers['authorization'].split('Bearer ')[1];
    if (token) {
      try {
        const decodedToken = jwt.verify(token, this._app_key);
        const db = new Database("User");
        const toExclude = getModelExcludeString("User");
        const user = await db.findOne({ _id: decodedToken._id }, toExclude, { lean: true });
        if (user != null) {
          req.user = { ...user };
          req.decodedToken = decodedToken;
          return next();
        } else {
          debug.danger("You are not authorize. Expired or invalid token.");
          return res.status(400).json({ error: "You are not authorize. Expired or invalid token." });
        }
      } catch (err) {
        debug.danger(err.message);
        return res.status(400).json({ error: "You are not authorize. Expired or invalid token." });
      }
    }
    debug.danger("Missing required field `Authorization` on request headers. It must contain `Bearer {token}`.");
    return res.status(500).json({ error: "Missing required field `Authorization` on request headers. It must contain `Bearer {token}`." });
  }

  decodeToken = (req, res, next) => {
    if (!req.headers['authorization']) {
      debug.danger("Missing required field `Authorization` on request headers. It must contain `Bearer {token}`.");
      return res.status(500).json({ error: "Missing required field `Authorization` on request headers. It must contain `Bearer {token}`." });
    }

    const token = req.headers['authorization'].split('Bearer ')[1];
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        req.decodedToken = decodedToken;
        return next();
      } catch (err) {
        debug.danger(err.message);
        return res.status(500).json({ error: err.message });
      }
    }
    debug.danger("Missing required field `Authorization` on request headers. It must contain `Bearer {token}`.");
    return res.status(500).json({ error: "Missing required field `Authorization` on request headers. It must contain `Bearer {token}`." });
  }
}

module.exports = Middleware;
