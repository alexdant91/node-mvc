const Database = require('../Database');
const permissionTypes = require('./define');

class Roles {

  static auth = (modelName) => async (req, res, next) => {
    const Role = new Database("Role");

    const user = { ...req.user };
    const method = req.method;
    const role_group_name = user.role_group_name;

    try {
      const role = await Role.findOne({ group_name: role_group_name });

      if (role == null) {
        debug.danger("Specified role name not found");
        return res.status(404).json({ error: "Specified role name not found" });
      }

      const is_auth_all_models = role.is_auth_all_models;

      if (is_auth_all_models) {
        return next();
      }

      const auth_models = role.auth_models;

      const auth_model = auth_models.find(m => m.model_ref_name == modelName);

      if (auth_model == null) {
        return next();
      }

      const grantedMethod = [];
      const userPermissions = [];

      if (auth_model.create) permissions.push("create");
      if (auth_model.read) permissions.push("read");
      if (auth_model.update) permissions.push("update");
      if (auth_model.delete) permissions.push("delete");

      permissionTypes.forEach(ps => {
        if (userPermissions.indexOf(ps.type) !== -1) {
          ps.methods.forEach(p => {
            grantedMethod.push(p.toUpperCase());
          });
        }
      });

      if (grantedMethod.indexOf(method.toUpperCase()) !== -1) {
        // Authorized
        req.auth = {
          options: {
            restrict_to_owner: auth_model.restrict_to_owner,
            owner_field_name: auth_model.owner_field_name
          }
        };

        return next();
      }

      debug.danger("User not allowed to perform this action.");
      return res.status(403).json({ error: "User not allowed to perform this action." });

    } catch (err) {
      debug.danger(err.message);
      return res.status(500).json({ error: "Internal Server Error." });
    }
  }

}

module.exports = Roles;
