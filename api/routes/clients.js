const router = require('express').Router();
const Client = require('../models/clients');

router.route('/').get((req, res) => {
  Client.find()
    .then((clients) => res.json(clients))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/client').post((req, res) => {
  const { id } = req.body;
  Client.findById({ _id: id })
    .then((client) => res.json(client))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { name, surname, phone, ...values } = req.body;
  const newClient = new Client({ name, surname, phone, ...values });

  newClient
    .save()
    .then(() => res.json('Client added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update').post((req, res) => {
  const { id, values } = req.body;
  console.log(id, values);
  Client.findOneAndUpdate({ _id: id }, { ...values }, { new: true })
    .then(() => res.json('Client updated!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/delete').post((req, res) => {
  const { clientId } = req.body;

  Client.findByIdAndDelete({ _id: clientId })
    .then(() => res.json('Client deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
