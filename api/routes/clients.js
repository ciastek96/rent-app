const router = require('express').Router();
const mongoose = require('mongoose');
const Client = require('../models/clients');

router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const clients = await Client.find({ userID: id });
    res.status(200).json(clients);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/client', async (req, res) => {
  // const { id } = req.body;
  // Client.findById({ _id: id })
  //   .then((client) => res.json(client))
  //   .catch((err) => res.status(400).json(`Error: ${err}`));

  const { id } = req.body;
  try {
    const client = await Client.findById({ _id: id });
    res.status(200).json(client);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  // const { ...values } = req.body;
  // const newClient = new Client({ ...values });

  // newClient
  //   .save()
  //   .then(() => res.json('Client added!'))
  //   .catch((err) => res.status(400).json(`Error: ${err}`));
  const { ...values } = req.body;
  const newClient = new Client({ ...values });

  try {
    newClient.save();

    res.status(201).json(newClient);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

// router.post('/update', async (req, res) => {
//   const { id, values } = req.body;

//   Client.findOneAndUpdate({ _id: id }, { ...values }, { new: true })
//     .then(() => res.json('Client updated!'))
//     .catch((err) => res.status(409).json(`Error: ${err}`));
// });

router.patch('/:id', async (req, res) => {
  const { id: _id } = req.params;
  const values = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No clients with that ID');

  try {
    const updatedClient = await Client.findByIdAndUpdate({ _id }, values, { new: true });
    res.status(201).json(updatedClient);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No clients with that ID');

  await Client.findByIdAndRemove({ _id });
  res.json({ message: 'Client deleted successfully' });
});

module.exports = router;
