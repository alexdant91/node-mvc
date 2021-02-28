module.exports = `class %__MODEL_NAME__% {
  /**
   * Model id label name in others tables/documents
   */
  static modelIdLabel = '%__MODEL_MIN_NAME__%_id'
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
