import Storage from './storage';
import { STORAGE_KEY } from '../constants';

class User {
  constructor() {
    this.storage = new Storage();
  }

  isAuthenticated = () => {
    const userToken = this.getUserToken();

    if (!Object.keys(userToken).length) {
      return false;
    }

    return true;
  };

  getUserToken = () => this.storage.get('token');

  signOut = () => {
    this.storage.delete(STORAGE_KEY);
    this.userManager.signoutRedirect();
  };

  forceLogout = () => {
    this.storage.delete('token');
    window.location = '/signin';
  };
}

export default User;
