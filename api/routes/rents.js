const router = require('express').Router();
const mongoose = require('mongoose');
const Rent = require('../models/rents');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rents = await Rent.find({ userID: id });
    res.status(200).json(rents);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  // const {
  //   values: { client, dateOfRent, dateOfReturn, products },
  // } = req.body;
  const values = req.body;

  const newRent = new Rent(values);

  try {
    newRent.save();
    res.status(201).json(newRent);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { id: _id } = req.params;
  const values = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No rent with that ID');

  try {
    const updatedRent = await Rent.findByIdAndUpdate({ _id }, values, { new: true });
    res.status(201).json(updatedRent);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.patch('/finish/:id', async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No rent with that ID');

  try {
    const finishedRent = await Rent.findByIdAndUpdate({ _id }, { isFinished: true }, { new: true });
    res.status(201).json(finishedRent);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No rent with that ID');

  await Rent.findByIdAndRemove({ _id });
  res.json({ message: 'Rent deleted successfully' });
});

module.exports = router;
