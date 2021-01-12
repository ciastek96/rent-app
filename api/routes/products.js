const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/products');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.find({ userID: id });
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/product', async (req, res) => {
  const { id } = req.body;

  try {
    const product = await Product.findById({ _id: id });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  const values = req.body;
  const { brutto, vat } = values;
  const netto = (brutto / (1 + vat / 100)).toFixed(2);

  const newProduct = new Product({ ...values, netto });

  try {
    newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { id: _id } = req.params;
  const values = req.body;
  const { brutto, vat } = values;

  const netto = (brutto * (1 - vat / 100)).toFixed(2);

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No products with that ID');

  try {
    const updatedProduct = await Product.findByIdAndUpdate({ _id }, { ...values, netto }, { new: true });
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No products with that ID');

  try {
    await Product.findByIdAndRemove({ _id });
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;
