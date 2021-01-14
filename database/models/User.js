module.exports = User = (Types) => ({ // 'Types' get you the ability to set Types.ObjectId on 'ref' keys
  // Set user schema
  email: {
    type: String,
    required: true,
    unique: true,
  },
  full_name: {
    type: String,
    required: false,
    default: null
  },
  password: {
    type: String,
    required: true
  }
});
