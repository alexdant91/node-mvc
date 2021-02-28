const Controllers = include("app.core.controllers");
const WSEmitter = include("app.core.socket");

class UserController extends Controllers {
  constructor() {
    super("User", { restrictToOwner: false });
  }

  all = async (req, res, next) => {
    // const io = req.app.get("io");
    // io.of('/home').emit('findAll', { message: 'Find all' })
    WSEmitter.emit('home', 'findAll', { message: 'Find all' })

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
