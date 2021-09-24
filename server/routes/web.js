const { clientPortal } = require('../controllers/web');

module.exports = (router) => {
  router.get('/', clientPortal);
  router.all('/*', clientPortal);
  router.all('/*/*', clientPortal);
};
