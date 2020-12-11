const express = require('express');
const cors = require('cors');
const mongo = require('mongodb');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const clientsRouter = require('./routes/clients');
const rentsRouter = require('./routes/rents');
const accountsRouter = require('./routes/accounts');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.NODE_DATABASE;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Connection error.', err);
});

db.once('open', () => {
  console.log('Connected to database.');
});

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/clients', clientsRouter);
app.use('/rents', rentsRouter);
app.use('/accounts', accountsRouter);

app.get('/', (req, res) => {
  res.send('gitara');
  res.end();
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Server is running on port: ${port}`);
});
