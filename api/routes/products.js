const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/products');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
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
  const { productName, price, quantity, unit, dateOfPurchase, dateOfLastInspection, selectedFile } = req.body;

  const newProduct = new Product({ productName, price, quantity, unit, dateOfPurchase, dateOfLastInspection, selectedFile });

  try {
    newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { id: _id } = req.params;
  const { ...values } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No products with that ID');

  try {
    const updatedProduct = await Product.findByIdAndUpdate({ _id }, values, { new: true });
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No products with that ID');

  await Product.findByIdAndRemove({ _id });
  res.json({ message: 'Client deleted successfully' });
});

module.exports = router;
