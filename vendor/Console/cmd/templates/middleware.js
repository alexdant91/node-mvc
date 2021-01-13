module.exports = `const Middleware = require('../../../vendor/Middleware');

class %__MODEL_NAME__% extends Middleware {
  constructor() {
    super();
  }

  myMiddlFn = (req, res, next) => {
    // Pass your middleware here
    // return this.verifyToken(req, res, next); -> Middleware class utility function
  }

  // Write as many middleware function as needed ;)

}

module.exports = new %__MODEL_NAME__%();
`;
