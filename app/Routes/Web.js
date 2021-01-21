const WebProvider = include('app.providers.WebProvider');

/**
 * @path /*
 */
class Web {
  static setup = (Route) => [
    // Set all Web routes here
    Route.router.get('/', WebProvider.singlePageApplication),
  ]
}

module.exports = Web;
