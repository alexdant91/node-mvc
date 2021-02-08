class TemplateEngineProvider {
  static render = (page, options) => (_, res) => {
    // Passing options and local nonce
    res.render(page, { ...options, localNonce: res.locals.nonce });
  }
}

module.exports = TemplateEngineProvider;
