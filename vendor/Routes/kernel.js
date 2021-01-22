const Api = require('../../app/Routes/Api');
const Auth = require('../../app/Routes/Auth');
const Web = require('../../app/Routes/Web');

const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

class ApiRoutes extends Api {
  static init = (Route, prefixPath = '/api') => Route.prefix(prefixPath).group(...Api.setup(Route))
}

class AuthRoutes extends Auth {
  static init = (Route, prefixPath = '/auth') => Route.prefix(prefixPath).group(...Auth.setup(Route))
}

class WebRoutes extends Web {
  static init = (Route) => {
    return Web.setup(Route).forEach(routes => routes)
  }
}


class ServerMiddelware {
  static init = (Route) => {
    Route.use(cors());
    Route.use(helmet());
    Route.use(bodyParser.json());
    Route.use(bodyParser.urlencoded({ extended: true }));
    if (config.options.verbose) Route.use(morgan('tiny'));
  }
}

class StaticMiddleware {
  static init = (Route, paths = [{ pathname: '/public/assets', dir: '/public/assets' }, { pathname: '/public/assets', dir: '/public/assets' }]) => {
    paths.forEach(({ pathname, dir }) => {
      Route.getApp().use(pathname, Route.getExpress().static(path.join(__dirname, '/../../', dir)));
    });
  }
}

module.exports.WebRoutes = WebRoutes;
module.exports.AuthRoutes = AuthRoutes;
module.exports.ApiRoutes = ApiRoutes;
module.exports.ServerMiddelware = ServerMiddelware;
module.exports.StaticMiddleware = StaticMiddleware;
