const router = require('express').Router();
const mongoose = require('mongoose');
const Rent = require('../models/rents');

router.route('/').get((req, res) => {
  Rent.find()
    .then((rents) => res.json(rents))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const {
    values: { client, dateOfRent, dateOfReturn, products },
  } = req.body;

  const newRent = new Rent({ client, dateOfRent, dateOfReturn, products });

  newRent
    .save()
    .then(() => res.json('Rent added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update').post((req, res) => {
  const { rentId, ...values } = req.body;

  Rent.findOneAndUpdate({ _id: rentId }, { ...values }, { new: true })
    .then(() => res.json('Rent updated!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No rent with that ID');

  Rent.findOneAndDelete({ _id })
    .then(() => res.json('Rent deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
