export class Logger {
  static log(...params) {
    console.log(params);
  }

  static debug(...params) {
    console.debug(params);
  }

  static info(...params) {
    console.info(params);
  }

  static warn(...params) {
    console.warn(params);
  }

  static error(...params) {
    console.warn('%c ERROR: ', 'background:red;color:#fff', ...params);
  }
}
