/**
 * PGSQL Type class utility
 */
class Varchar {
  constructor() {
    this.dataType = 'VARCHAR';
  }
}

class Text {
  constructor() {
    this.dataType = 'TEXT';
  }
}

class String {
  constructor() {
    this.dataType = 'TEXT';
  }
}

class Array {
  constructor() {
    this.dataType = 'ARRAY';
  }
}

class Number {
  constructor() {
    this.dataType = 'DECIMALS';
  }
}

class Boolean {
  constructor() {
    this.dataType = 'BOOLEAN';
  }
}

class Date {
  constructor() {
    this.dataType = 'DATE';
  }
}

module.exports = {
  Varchar, Text, String, Array, Number, Boolean, Date
}
