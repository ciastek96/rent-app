const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/products');

router.route('/').get((req, res) => {
  Product.find()
    .then((products) => res.status(201).json(products))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/product').post((req, res) => {
  const { id } = req.body;
  Product.findById({ _id: id })
    .then((product) => res.status(201).json(product))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { productName, price, quantity, unit, dateOfPurchase, dateOfLastInspection, selectedFile } = req.body;

  const newProduct = new Product({ productName, price, quantity, unit, dateOfPurchase, dateOfLastInspection, selectedFile });

  // const product = req.body;

  // try {
  //   await newPost.save();
  //   res.status(201).json(newPost)
  // } catch(err) {
  //   res.status(409).json({err})
  // }

  newProduct
    .save()
    .then(() => res.status(201).json('Product added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update').post((req, res) => {
  const { id: _id, ...values } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No products with that ID');

  Product.findOneAndUpdate({ _id }, { values }, { new: true })
    .then(() => res.status(201).json('Product updated!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No products with that ID');

  Product.findByIdAndRemove({ _id })
    .then(() => res.status(201).json('Product deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
