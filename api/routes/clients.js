const router = require('express').Router();
const mongoose = require('mongoose');
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
  const { ...values } = req.body;
  const newClient = new Client({ ...values });

  newClient
    .save()
    .then(() => res.json('Client added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update').post((req, res) => {
  const { id, values } = req.body;

  Client.findOneAndUpdate({ _id: id }, { ...values }, { new: true })
    .then(() => res.json('Client updated!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No clients with that ID');

  Client.findByIdAndRemove({ _id })
    .then(() => res.status(201).json('Client deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
