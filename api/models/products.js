const mongoose = require('mongoose');

const { Schema } = mongoose;

const productsSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
  },
  price: {
    type: Number,
    required: true,
  },
  dateOfPurchase: Date,
  dateOfLastInspection: Date,
  quantity: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  selectedFile: String,
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
