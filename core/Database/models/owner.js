const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  firstName: {
    type: String,
    required: false,
    default: null
  },
  lastName: {
    type: String,
    required: false,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: null
  },
  role_group_name: {
    type: String,
    required: true,
    default: "OWNER",
  },
}, { strict: true, timestamps: true });

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
