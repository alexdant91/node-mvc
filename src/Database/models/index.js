const RolesModel = require('./roles');
const OwnerModel = require('./owner');
const AdminsModel = require('./admins');

module.exports = [
  { name: "Role", model: RolesModel },
  { name: "Owner", model: OwnerModel },
  { name: "Admin", model: AdminsModel },
]
