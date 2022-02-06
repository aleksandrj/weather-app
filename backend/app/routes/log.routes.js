module.exports = (app) => {
  const logs = require('../controller/log.controller.js');
  var router = require('express').Router();

  router.post('/', logs.create);
  app.use('/api/logs', router);
};
