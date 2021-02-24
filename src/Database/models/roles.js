const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
  group_name: {
    type: String,
    required: true,
    unique: true,
  },
  is_auth_all_models: {
    type: Boolean,
    required: true,
    default: false
  },
  auth_models: {
    type: [{
      create: { type: Boolean, default: true },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: true },
      delete: { type: Boolean, default: true },
      model_ref_name: { type: String, required: true },
      restrict_to_owner: { type: Boolean, default: true },
      owner_field_name: { type: String, required: false },
    }],
    required: false,
    default: []
  },
}, { strict: true, timestamps: true });

const Role = mongoose.model('Role', rolesSchema);

module.exports = Role;
