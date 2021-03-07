const io = require('./index');

class WSEmitter {
  /**
   * @param {string} of Set namespace
   * @param {string} event Event name
   * @param {*} data Data to send
   */
  static emit = (path = { of: false, to: false }, event, data) => {
    if (typeof path !== "object") {
      if (path.startsWith("/")) path = { of: path, to: false };
      else path = { of: false, to: path.toString() };
    }

    if (path.of == undefined) path.of = false;
    if (path.to == undefined) path.to = false;

    if (path.of && !path.to) return io.of(path.of).emit(event, data);
    if (!path.of && path.to) return io.to(path.to.toString()).emit(event, data);
    if (path.of && path.to) return io.of(path.of).to(path.to.toString()).emit(event, data);
  }
}

module.exports = WSEmitter;
