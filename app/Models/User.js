const Models = include("app.core.models");

class User extends Models {
  constructor() {
    super("User");
  }

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
}

module.exports = User;
