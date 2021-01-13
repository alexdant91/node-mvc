module.exports = `const Models = require('../../../vendor/Models');

class %__MODEL_NAME__%Controller extends Models {
  constructor() {
    super();
    this.Model = new Models("%__MODEL_NAME__%");
  }

  // Set all controllers here
  all = async (req, res) => {
    // this.Model.findAll(req, res);
  }

  index = async (req, res) => {
    // this.Model.findById(req, res);
  }

  search = async (by, req, res) => {
    // this.Model.find(by, req, res);
  }

  searchOne = async (by, req, res) => {
    // this.Model.findOne(by, req, res);
  }

  store = async (req, res) => {
    // Manipulate request here
    // this.Model.create(req, res);
  }

  update = async (req, res) => {
    // Manipulate request here
    // this.Model.update(req, res);
  }

  delete = async (req, res) => {
    // this.Model.delete(req, res);
  }
}

module.exports = new %__MODEL_NAME__%Controller();
`
