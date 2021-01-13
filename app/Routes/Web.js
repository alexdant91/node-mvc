class Web {
  static setup = (Route) => [
    // Set all Web routes here
    Route.router.get('/', (_, res) => res.send(`<h1>Hello World</h1>`)),
  ]
}

module.exports = Web;
