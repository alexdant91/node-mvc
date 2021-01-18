const bcrypt = require('bcryptjs');
const Database = include('app.core.database');

class AuthUser {
  static login = async (payload) => {
    try {
      const db = new Database("User");
      const user = await db.findOne({ email: payload.email });
      if (user != null) {
        const compare = await bcrypt.compare(payload.password, user.password);
        if (compare) return user;
      }
      return false;
    } catch (err) {
      debug.danger(err.message);
      return false;
    }
  }
}

module.exports = AuthUser;
