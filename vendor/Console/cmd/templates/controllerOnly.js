module.exports = `class %__MODEL_NAME__%Controller {
  // Set all controllers here
  all = async (req, res, next) => {
    // this.Model.findAll(req, res);
  }

  index = async (req, res, next) => {
    // this.Model.findById(req, res);
  }

  search = async (req, res, next) => {
    // this.Model.find(req, res);
  }

  searchOne = async (req, res, next) => {
    // this.Model.findOne(req, res);
  }

  store = async (req, res, next) => {
    // Manipulate request here
    // this.Model.create(req, res);
  }

  update = async (req, res, next) => {
    // Manipulate request here
    // this.Model.update(req, res);
  }

  delete = async (req, res, next) => {
    // this.Model.delete(req, res);
  }
}

module.exports = new %__MODEL_NAME__%Controller();
`
