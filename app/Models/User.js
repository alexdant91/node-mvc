const Models = require('../../vendor/Models');

class User extends Models {
  constructor() {
    super();
    this.Model = new Models("User");
  }

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

module.exports = User;
