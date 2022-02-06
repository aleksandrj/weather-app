const db = require('../model');
const Log = db.logs;

exports.create = (req, res) => {
  if (!req.body.action) {
    res.status(400).send({ message: 'Action was not found.' });
    return;
  }
  const log = new Log({
    action: req.body.action,
    value: req.body.value,
    result: req.body.result,
  });

  log
    .save(log)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Failed to create new entry.',
      });
    });
};
