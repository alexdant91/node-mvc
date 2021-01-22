class Helpers {

  static getToken = (req) => {
    if (req.headers["authorization"]) return req.headers["authorization"].replace('Bearer ', '');
    if (req.query && req.query.token) return req.query.token;
    if (req.params && req.params.token) return req.params.token;
    if (req.body && req.body.token) return req.body.token;
    return false;
  }

}

module.exports = Helpers;
