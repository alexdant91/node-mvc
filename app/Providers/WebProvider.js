const path = require('path');

class WebProvider {
  static singlePageApplication = (_, res) => {
    return res.sendFile(path.join(__dirname, "/../../public/index.html"));
  }
}

module.exports = WebProvider;
