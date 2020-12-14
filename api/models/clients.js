const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  company: [
    {
      companyName: {
        type: String,
        minLength: 4,
      },
      nip: {
        type: String,
        minLength: 10,
        maxLength: 10,
      },
    },
  ],
  phone: { type: String, required: true, trim: true },
  email: {
    type: String,
    trim: true,
  },
  address: [
    {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      postalCode: {
        type: String,
        trim: true,
      },
    },
  ],
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
