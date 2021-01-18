const Api = require('../../app/Routes/Api');
const Auth = require('../../app/Routes/Auth');
const Web = require('../../app/Routes/Web');

const cors = require('cors');
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
  static init = (Route, prefixPath = '/') => Route.prefix(prefixPath).group(...Web.setup(Route))
}


class ServerMiddelware {
  static init = (Route) => {
    Route.use(cors());
    Route.use(helmet());
    Route.use(bodyParser.json());
    Route.use(bodyParser.urlencoded({ extended: true }));
    Route.use('/public', require('express').static(__dirname + '/../../public'));
    if (config.options.verbose) Route.use(morgan('tiny'));
  }
}

module.exports.ServerMiddelware = ServerMiddelware;
module.exports.WebRoutes = WebRoutes;
module.exports.AuthRoutes = AuthRoutes;
module.exports.ApiRoutes = ApiRoutes;
