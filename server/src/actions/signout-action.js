import Storage from '../utils/storage';

const storage = new Storage();

const signout = () => {
  storage.delete('token');
};

export default signout;
