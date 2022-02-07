class User {
  /**
   * Model id label name in others tables/documents
   */
  static modelIdLabel = 'user_id'
  /**
   * Excluded fields from outputs
   */
  static exclude = [
    'password',
    'client_id',
    'client_secret',
    '__v',
  ]
  /**
   * Fields to hash (like password) on store and update
   */
  static hash = [
    'password'
  ]
  /**
   * Fields to auto generate
   */
  static autoGenerate = [
    { path: 'client_id', type: String },
    { path: 'client_secret', type: String },
  ]
}

module.exports = User;
