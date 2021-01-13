const Models = require('../../../vendor/Models');
const bcrypt = require('bcryptjs');

class UserController extends Models {
  constructor() {
    super();
    this.Model = new Models("User");
  }

  // Set all controllers here

  all = async (req, res) => {
    this.Model.findAll(req, res);
  }

  index = async (req, res) => {
    this.Model.findById(req, res);
  }

  search = async (by, req, res) => {
    this.Model.find(by, req, res);
  }

  searchOne = async (by, req, res) => {
    this.Model.findOne(by, req, res);
  }

  store = async (req, res) => {
    // Manipulate request here
    this.Model.create(req, res);
  }

  update = async (req, res) => {
    // Manipulate request here
    this.Model.update(req, res);
  }

  delete = async (req, res) => {
    this.Model.delete(req, res);
  }
}

module.exports = new UserController();
