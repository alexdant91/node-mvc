const AuthUser = include('app.services.auth.AuthUser');
const AuthUserClient = include('app.services.auth.AuthUserClient');
const Middleware = include('app.core.middleware.Auth');

class Authorization extends Middleware {
  constructor() {
    super();
  }

  auth = async (req, res, next) => {
    return await this.verifyToken(req, res, next);
  }

  authUserClient = async (req, res, next) => {
    // Auth required
    const user_id = req.decodedToken._id || req.user._id || false;
    const client_id = req.headers["client_id"];
    const client_secret = req.headers["client_secret"];

    if (user_id && client_id && client_secret) {
      if (await AuthUserClient.auth(user_id, { client_id, client_secret })) return next();
      return res.status(401).json({ error: "Not Authorized, client authorization required." })
    } else {
      return res.status(401).json({ error: "Not Authorized, client not found." });
    }
  }

  login = async (req, res) => {
    const user = await AuthUser.login(req.body);
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    req.user = { ...user };
    req.body.payload = { ...user };
    return this.signToken(req, res);
  }

  sign = (req, res, next) => {
    return this.signToken(req, res, next);
  }

}

module.exports = new Authorization();
