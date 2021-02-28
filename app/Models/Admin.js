class Admin {
  /**
   * Model id label name in others tables/documents
   */
  static modelIdLabel = 'admin_id'
  /**
   * Excluded fields from outputs
   */
  static exclude = [
    'password',
    '__v',
  ]
  /**
   * Fields to hash (like password) on store and update
   */
  static hash = [
    'password'
  ]
}

module.exports = Admin;
