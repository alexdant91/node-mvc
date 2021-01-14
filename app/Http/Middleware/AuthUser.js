const bcrypt = require('bcryptjs');
const Database = require('../../../vendor/Database');

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
  // static login = async (payload) => {
  //   try {
  //     const { User } = Database.get("models");
  //     const user = await User.findOne({ email: payload.email }, null, { lean: true });
  //     if (user != null) {
  //       const compare = await bcrypt.compare(payload.password, user.password);
  //       if (compare) return user;
  //     }
  //     return false;
  //   } catch (err) {
  //     debug.danger(err.message);
  //     return false;
  //   }
  // }
}

module.exports = AuthUser;
