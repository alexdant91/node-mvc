module.exports = User = () => ({
  // Set user schema
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});
