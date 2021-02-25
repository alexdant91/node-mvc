// const WebProvider = include('app.providers.WebProvider');
const TemplateEngineProvider = include('app.providers.TemplateEngineProvider');

/**
 * @path /*
 */
class Web {
  static setup = (Route) => [
    // Set all Web routes here, this is not a prefixed route so use `Route.[method](...)` instead of `Route.router.[method](...)`
    // Use normal html files to render a simple page without the template engine work
    // Route.get('/', WebProvider.singlePageApplication),

    // Use the default template engine
    Route.get('/mvc', TemplateEngineProvider.render('index', {
      title: 'Welcome Home!',
      subtitle: `This is the brand new <span class="font-bold text-indigo-400">NodeMVC</span> template engine system 😁<br />
                 We use 💰 <span class="font-bold underline text-indigo-400"><a href="https://github.com/fabiospampinato/cash" target="_blank">cash.js</a></span>
                 to manipulate DOM. <br /><br />Have fun! 🎉`,
      currentYear: new Date().getFullYear(),
    })),
  ]
}

module.exports = Web;
