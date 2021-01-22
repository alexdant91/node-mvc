const jwt = require('jsonwebtoken');

class AuthUploads {

  static auth = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.APP_KEY);
      if (decoded) return true;
      return false;
    } catch (err) {
      if (err.message == "jwt expired") return { error: "Token was expired." };
      return err.message;
    }
  }
}

module.exports = AuthUploads;
