require('dotenv').config();
const { APP_KEY, APP_NAME } = process.env;
const jwt = require('jsonwebtoken');

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

  signToken = (req, res, next = undefined) => {
    delete req.body.payload.password
    const tokenPayload = req.body.payload;
    if (tokenPayload) {
      this.setupToken(tokenPayload);
      if (this._isSetupDone) {
        const token = jwt.sign(this._tokenPayload, this._app_key, { expiresIn: this._tokenOptions.expiresIn, issuer: this._tokenOptions.issuer });
        this._tokenApp = token;
        if (next) {
          req.token = token;
          return next();
        }
        return res.status(200).json({ token });
      }
      debug.danger("You need to call `setupToken` method before processing token.");
      return res.status(500).json({ error: "Internal Server Error." });
    }
    debug.danger("Missing required field `payload` on request. It must contain token payload to sign.");
    return res.status(500).json({ error: "Missing required field `payload` on request. It must contain token payload to sign." });
  }

  verifyToken = (req, res, next) => {
    if (!req.headers['authorization']) {
      debug.danger("Missing required field `Authorization` on request headers. It must contain `Bearer {token}` to verify.");
      return res.status(500).json({ error: "Missing required field `Authorization` on request headers. It must contain `Bearer {token}` to verify." });
    }

    const token = req.headers['authorization'].split('Bearer ')[1];
    if (token) {
      try {
        const decodedToken = jwt.verify(token, this._app_key);
        req.decodedToken = decodedToken;
        return next();
      } catch (err) {
        debug.danger(err.message);
        return res.status(400).json({ error: "You are not authorize. Expired or invalid token." });
      }
    }
    debug.danger("Missing required field `Authorization` on request headers. It must contain `Bearer {token}` to verify.");
    return res.status(500).json({ error: "Missing required field `Authorization` on request headers. It must contain `Bearer {token}` to verify." });
  }

  decodeToken = (req, res, next) => {
    if (!req.headers['authorization']) {
      debug.danger("Missing required field `Authorization` on request headers. It must contain `Bearer {token}` to verify.");
      return res.status(500).json({ error: "Missing required field `Authorization` on request headers. It must contain `Bearer {token}` to verify." });
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
    debug.danger("Missing required field `Authorization` on request headers. It must contain `Bearer {token}` to verify.");
    return res.status(500).json({ error: "Missing required field `Authorization` on request headers. It must contain `Bearer {token}` to verify." });
  }
}

module.exports = Middleware;
