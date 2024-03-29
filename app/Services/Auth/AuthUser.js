const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Database = include('app.core.database');

class AuthUser {
  static decodeToken = (token) => {
    return jwt.decode(token);
  }

  static login = async (payload) => {
    try {
      const db = new Database("User");
      const user = await db.findOne({ email: payload.email }, null, {}, { excludeFields: false });
      if (user != null) {
        const compare = await bcrypt.compare(payload.password, user.password);
        if (compare) return user;
      }
      return false;
    } catch (err) {
      console.log(err)
      debug.danger(err.message);
      return false;
    }
  }
}

module.exports = AuthUser;
