const mongoose = require('mongoose');

const { Schema } = mongoose;

const rentsSchema = new Schema({
  client: {
    type: Object,
    required: true,
  },
  dateOfRent: {
    type: Date,
    required: true,
  },
  dateOfReturn: {
    type: Date,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  advance: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    trim: true,
  },
  products: [
    {
      type: String,
      required: true,
    },
  ],
  brutto: {
    type: Number,
    required: true,
  },
  netto: {
    type: Number,
    required: true,
  },
  vat: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  rentsDurr: {
    type: Number,
    required: true,
  },
});

const Rent = mongoose.model('Rent', rentsSchema);

module.exports = Rent;
