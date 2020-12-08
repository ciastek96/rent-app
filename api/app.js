const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('connection error', err);
});
db.once('open', () => {
  console.log('Connected to database.');
});

// const client = new mongo.MongoClient('mongodb://localhost:27017', {
//   useNewUrlParser: true,
// });

app.listen(port, '127.0.0.1', () => {
  console.log(`Server is listening at ${port} port `);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json('Witaj');
  res.end();
});
