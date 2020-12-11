const mongoose = require('mongoose');

const { Schema } = mongoose;

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
  },
  price: {
    type: Number,
    required: true,
  },
  dateOfPurchase: {
    type: Date,
  },
  dateOfLastInspection: { type: Date },
  quantity: {
    type: String,
    required: true,
    unique: false,
  },
  unit: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
