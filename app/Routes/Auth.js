const Authorization = include("app.http.middleware.Authorization");

/**
 * @path /auth/*
 */
class Auth {
  static setup = (Route) => [
    Route.router.post('/token', Authorization.login),
  ]
}

module.exports = Auth;
