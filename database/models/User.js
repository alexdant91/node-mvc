module.exports = User = (Types) => ({ // 'Types' get you the ability to set Types.ObjectId on 'ref' keys
  // Set user schema
  email: {
    type: String,
    length: 50,
    required: true,
    unique: true,
  },
  full_name: {
    type: String,
    length: 50,
    required: false,
    default: null,
  },
  password: {
    type: String,
    length: 50,
    required: true,
  },
  client_id: {
    type: String,
    length: 150,
    required: true,
  },
  client_secret: {
    type: String,
    length: 250,
    required: true,
  }
});
