const WebProvider = include('app.providers.WebProvider');

/**
 * @path /*
 */
class Web {
  static setup = (Route) => [
    // Set all Web routes here, this is not a prefixed route so use `Route.[method](...)` instead of `Route.router.[method](...)`
    Route.get('/', WebProvider.singlePageApplication),
  ]
}

module.exports = Web;
