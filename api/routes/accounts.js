const router = require('express').Router();
const mongoose = require('mongoose');
const Account = require('../models/accounts');

router.post('/:id', async (req, res) => {
  const { id: userID } = req.params;
  const account = await Account.findOne({ userID });
  try {
    res.status(200).send(account);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.route('/add').post((req, res) => {
  const { userId } = req.body;
  const newAccount = new Account({ userId });

  newAccount
    .save()
    .then(() => res.json('Account added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.patch('/:id', async (req, res) => {
  const { id: userID } = req.params;
  const { ...values } = req.body;

  try {
    const updatedAccount = await Account.findOneAndUpdate({ userID }, values, { new: true });
    res.status(201).json(updatedAccount);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }

  // Account.findOneAndUpdate({ userId }, { ...values }, { new: true })
  //   .then(() => res.json('Account updated!'))
  //   .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get('/', async (req, res) => {
  const accounts = await Account.find();
  try {
    res.status(200).send(accounts);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.route('/delete').post((req, res) => {
  const { userId } = req.body;

  Account.findOneAndDelete({ _id: userId })
    .then(() => res.json('Account deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
