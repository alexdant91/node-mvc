const Api = require('../../app/Routes/Api');
const Auth = require('../../app/Routes/Auth');
const Web = require('../../app/Routes/Web');
const io = require('../Socket');

const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const crypto = require("crypto");
const bodyParser = require('body-parser');
const contentSecurityPolicy = require("helmet-csp");
const vhost = require('vhost');

class ApiRoutes extends Api {
  static init = (Route, prefixPath = '/api') => Route.prefix(prefixPath).group(...Api.setup(Route))
}

class AuthRoutes extends Auth {
  static init = (Route, prefixPath = '/auth') => Route.prefix(prefixPath).group(...Auth.setup(Route))
}

class WebRoutes extends Web {
  static init = (Route) => Web.setup(Route).forEach(routes => routes)
}

class ServerMiddelware {
  static init = (Route) => {
    Route.use(cors());
    Route.use(helmet());
    Route.use(bodyParser.json());
    Route.use(bodyParser.urlencoded({ extended: true }));
    Route.use((_, res, next) => { res.locals.nonce = crypto.randomBytes(16).toString("hex"); next(); });
    Route.use((req, res, next) =>
      contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'", "'unsafe-inline'", "*"],
          scriptSrc: ["'self'", `'nonce-${res.locals.nonce}'`],
        },
      })(req, res, next)
    );
    if (config.options.verbose) Route.use(morgan('tiny'));
    Route.getApp().set('io', io);
  }
}

class StaticMiddleware {
  static init = (Route, paths = [{ pathname: '/public/assets', dir: '/public/assets' }]) => {
    paths.forEach(({ pathname, dir }) => {
      Route.getApp().use(pathname, Route.getExpress().static(path.join(__dirname, '/../../', dir)));
    });
  }
}

class CreateSubdomain {
  constructor(subdomain) {
    this.subdomain = subdomain;
  }

  add = (Route, router) => {
    Route.use(vhost(this.subdomain, router));
  }
}

class Error404 {
  static init = (Route) => {
    Route.all('*', (_, res) => {
      return res.status(404).json({ error: "Sorry, we can't find the path you specified." });
    });
  }
}

module.exports.WebRoutes = WebRoutes;
module.exports.AuthRoutes = AuthRoutes;
module.exports.ApiRoutes = ApiRoutes;
module.exports.ServerMiddelware = ServerMiddelware;
module.exports.StaticMiddleware = StaticMiddleware;
module.exports.CreateSubdomain = CreateSubdomain;
module.exports.Error404 = Error404;
