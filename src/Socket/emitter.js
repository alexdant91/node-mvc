const io = require('./index');

class WSEmitter {
  /**
   * @param {string} of Set namespace
   * @param {string} event Event name
   * @param {*} data Data to send
   */
  static emit = (of, event, data) => {
    return io.of(of).emit(event, data);
  }
}

module.exports = WSEmitter;
