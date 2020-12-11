const router = require('express').Router();
const Product = require('../models/products');

router.route('/').get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const { name, unit, quantity, price, ...values } = req.body;
  const newProduct = new Product({ name, unit, quantity, price, ...values });

  newProduct
    .save()
    .then(() => res.json('Product added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/update').post((req, res) => {
  const { productId, ...values } = req.body;
  Product.findOneAndUpdate({ _id: productId }, { ...values }, { new: true })
    .then(() => res.json('Product updated!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/delete').post((req, res) => {
  const { productId } = req.body;

  Product.findByIdAndDelete({ _id: productId })
    .then(() => res.json('Product deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
