const Controllers = include("app.core.controllers");
const WSEmitter = include("app.core.socket");

class UserController extends Controllers {
  constructor() {
    super("User", { restrictToOwner: false });
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
    // const io = req.app.get("io");
    // io.of('/notifications').in(req.user._id.toString()).emit('notify', { message: 'Find specific user' })
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
    WSEmitter.emit({ of: "/notifications", to: req.user._id }, "notify", {
      id: new Date().getTime(),
      read: false,
      name: "You",
      action: "have just update your",
      target: "Profile",
      time: "2m",
      avatar: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Wayfarers&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BlondeGolden&clotheType=ShirtVNeck&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light",
    });

    this.update(req, res);
  }

  remove = async (req, res, next) => {
    this.delete(req, res);
  }
}

module.exports = new UserController();
