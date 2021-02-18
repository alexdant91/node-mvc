const Models = include("app.core.models");

class UserController extends Models {
  constructor() {
    super("User");
  }

  all = async (req, res, next) => {
    // Set special options
    // It works only for `findAll` method
    req.saveCache = {
      save: true,
      key: "user",
      refresh: true,
      refreshInterval: 1 * 60 * 60 * 24 * 1000 /* 1 day */
    };
    // Proceed to query
    this.findAll(req, res);
  }

  index = async (req, res, next) => {
    this.findById(req, res);
  }

  search = async (req, res, next) => {
    this.find(req, res);
  }

  searchOne = async (req, res, next) => {
    this.findOne(req, res);
  }

  store = async (req, res, next) => {
    // Manipulate request here
    this.create(req, res);
  }

  edit = async (req, res, next) => {
    // Manipulate request here
    this.update(req, res);
  }

  remove = async (req, res, next) => {
    this.delete(req, res);
  }
}

module.exports = new UserController();
