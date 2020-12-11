const router = require('express').Router();
const Rent = require('../models/rents');

router.route('/').get((req, res) => {
  Rent.find()
    .then((rents) => res.json(rents))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { clientId, dateOfRent, dateOfReturn, products, ...values } = req.body;
  const newRent = new Rent({ clientId, dateOfRent, dateOfReturn, products, ...values });

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

router.route('/delete').post((req, res) => {
  const { rentId } = req.body;

  Rent.findOneAndDelete({ _id: rentId })
    .then(() => res.json('Rent deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
