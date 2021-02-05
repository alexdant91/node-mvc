// Some e.g. utils imports
/**
 * const fs = require('fs');
 * const path = require('path');
 * const bcrypt = require('bcryptjs');
 * const jwt = require('jsonwebtoken');
 * const Database = include('app.core.database');
 */
const Database = include('app.core.database');

class AuthClient {
  static auth = async (user_id, payload = { client_id, client_secret }) => {
    if (!user_id || !payload.client_id || !payload.client_secret) {
      debug.danger("Missing required data `user_id`, `client_id`, `client_secret`.");
      return false;
    }

    try {
      const db = new Database("User");
      const user = await db.findOne({ _id: user_id, client_id: payload.client_id, client_secret: payload.client_secret }, null, { lean: true });

      if (user != null) return true;
      return false;
    } catch (err) {
      debug.danger(err.message);
      return false;
    }

  }
}

module.exports = AuthClient;
