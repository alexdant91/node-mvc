const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = require('../../../database/models/User');
const UserSchema = new Schema(UserModel(mongoose.Schema.Types), { timestamps: true });

module.exports = [
  {
    name: "User",
    schema: UserSchema
  },
]
