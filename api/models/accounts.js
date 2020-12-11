const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
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
  phone: { type: String, trim: true },
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
      postal: {
        type: String,
        trim: true,
      },
    },
  ],
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
