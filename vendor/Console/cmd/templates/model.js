module.exports = `const Models = require('../../vendor/Models');

class %__MODEL_NAME__% extends Models {
  constructor() {
    super();
    this.Model = new Models("%__MODEL_NAME__%");
  }

  /**
   * Excluded fields from outputs
   */
  static exclude = [

  ]
  /**
   * Fields to hash (like password) on store and update
   */
  static hash = [

  ]
}

module.exports = %__MODEL_NAME__%;
`
