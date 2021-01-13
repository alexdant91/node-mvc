const clear = require('clear');

module.exports.debug = {
  neutral(message, clearTerminal = false) {
    if (clearTerminal) clear();
    log(`[DEBUG]: ${message} – ${new Date().toISOString()}`);
  },
  success(message, clearTerminal = false) {
    if (clearTerminal) clear();
    log(chalk.green(`[SUCCESS]: ${message} – ${new Date().toISOString()}`));
  },
  successBanner(message) {
    clear();
    log(chalk.green.bgGreen(`   [SUCCESS]: ${message} – ${new Date().toISOString()}   `));
    log(chalk.bgGreen.bold(`   [SUCCESS]: ${message} – ${new Date().toISOString()}   `));
    log(chalk.green.bgGreen(`   [SUCCESS]: ${message} – ${new Date().toISOString()}   `));
    log();
  },
  warning(message, clearTerminal = false) {
    if (clearTerminal) clear();
    log(chalk.yellow(`[WARN]: ${message} – ${new Date().toISOString()}`));
  },
  warningBanner(message) {
    clear();
    log(chalk.yellow.bgYellow(`   [DEBUG]: ${message} – ${new Date().toISOString()}   `));
    log(chalk.bgYellow.bold(`   [DEBUG]: ${message} – ${new Date().toISOString()}   `));
    log(chalk.yellow.bgYellow(`   [DEBUG]: ${message} – ${new Date().toISOString()}   `));
    log();
  },
  danger(message, clearTerminal = false) {
    if (clearTerminal) clear();
    log(chalk.red(`[DANGER]: ${message} – ${new Date().toISOString()}`));
  },
  dangerBanner(message) {
    clear();
    log(chalk.red.bgRed(`   [DANGER]: ${message} – ${new Date().toISOString()}   `));
    log(chalk.bgRed.bold(`   [DANGER]: ${message} – ${new Date().toISOString()}   `));
    log(chalk.red.bgRed(`   [DANGER]: ${message} – ${new Date().toISOString()}   `));
    log();
  },
}
