import HttpHelper from './http-helper';
import Storage from './storage';

class Utils {
  constructor(args = {}) {
    const { baseUrl } = args;

    this.baseUrl = baseUrl;
    this.httpHelper = new HttpHelper();
    this.storage = new Storage();
  }

  getAll() {
    return {
      httpHelper: this.httpHelper,
      storage: this.storage,
    };
  }

  static getNameInitials = (name) => {
    const initials = name.match(/\b\w/g) || [];

    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  };
}

export default Utils;
