const router = require('express').Router();
const Account = require('../models/accounts');

router.route('/').get((req, res) => {
  Account.find()
    .then((rents) => res.json(rents))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { userId, name, surname, ...values } = req.body;
  const newAccount = new Account({ userId, name, surname, ...values });

  newAccount
    .save()
    .then(() => res.json('Account added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update').post((req, res) => {
  const { userId, ...values } = req.body;

  Account.findOneAndUpdate({ userId }, { ...values }, { new: true })
    .then(() => res.json('Account updated!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/delete').post((req, res) => {
  const { userId } = req.body;

  Account.findOneAndDelete({ _id: userId })
    .then(() => res.json('Account deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
