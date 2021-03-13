const permissionTypes = require('./define');

/**
 * Middleware functions to check if user
 * is guaranted based on stored permissions
 */
class Permissions {

  static Middleware = {
    check(req, res, next) {
      const method = req.method;
      // Authorization required
      const user = req.user;

      if (Permissions.check(method, user)) {
        // Authorized
        req.isGuaranted = true;
        return next();
      }
      return res.status(403).json({ error: "User not allowed to perform this action." });
    },
    checkSingle(modelName) {
      if (!modelName) {
        throw new Error("Model name is required");
      }

      return (req, res, next) => {
        const method = req.method;
        // Authorization required
        const user = req.user;

        if (Permissions.checkSingle(method, user, modelName)) {
          // Authorized
          req.isGuaranted = true;
          return next();
        }
        return res.status(403).json({ error: "User not allowed to perform this action." });
      }
    },
  }

  /**
   * Check global user permissions ['create', 'read', 'update', 'delete']
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  static check = (method, user) => {

    // Expected permissions array property
    const userPermissions = user.permissions;

    const grantedMethod = [];

    permissionTypes.forEach(ps => {
      if (userPermissions.indexOf(ps.type) !== -1) {
        ps.methods.forEach(p => {
          grantedMethod.push(p.toUpperCase());
        });
      }
    });

    if (grantedMethod.indexOf(method.toUpperCase()) !== -1) {
      // Authorized
      return true;
    }

    return false;
  }

  /**
   * Check user permissions on specific model `model:permission`
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  static checkSingle = (method, user, modelName) => {

    const model = modelName.toLowerCase();

    // Expected permissions array property
    const userPermissions = [];
    const userGlobalPermissions = [];

    // Filter permissions
    user.permissions.forEach(p => {
      if (p.match(/\:/ig)) {
        const s = p.split(":");
        if (model == s[0]) userPermissions.push(p);
      } else {
        userGlobalPermissions.push(p);
      }
    });

    const grantedMethod = [];

    permissionTypes.forEach(ps => {
      // If user permissions array contain model:permission authorize it
      // Allow only user with specific model:permission authorizzation guaranted
      if (userPermissions.indexOf(`${model}:${ps.type}`) !== -1) {
        ps.methods.forEach(p => {
          grantedMethod.push(p.toUpperCase());
        })
      };
    });

    if (grantedMethod.indexOf(method.toUpperCase()) !== -1) {
      return true;
    }

    return false;
  }
}

module.exports = Permissions;
