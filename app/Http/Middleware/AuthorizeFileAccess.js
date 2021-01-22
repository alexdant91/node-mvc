const Middleware = include('app.core.middleware.Auth');
const Helpers = include('app.helpers');
const AuthUploads = include('app.services.auth.AuthUploads');

class AuthorizeFileAccess extends Middleware {
  constructor() {
    super();
  }

  auth = (req, res, next) => {
    const token = Helpers.getToken(req);

    if (!token) {
      return res.status(422).json({ error: "Not authorized, you need to specify your auth token." });
    }

    const isAuth = AuthUploads.auth(token);

    if (!isAuth) return res.status(401).json({ error: "Not authorized." });

    if (isAuth.error) return res.status(401).json({ error: isAuth.error });

    return next();
  }

  // Write as many middleware function as needed ;)

}

module.exports = new AuthorizeFileAccess();
