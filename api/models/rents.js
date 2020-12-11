const mongoose = require('mongoose');

const { Schema } = mongoose;

const rentsSchema = new Schema({
  clientId: {
    type: mongoose.Schema.ObjectId,
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
  others: {
    type: String,
    trim: true,
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  ],
});

const Rent = mongoose.model('Rent', rentsSchema);

module.exports = Rent;
