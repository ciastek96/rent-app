const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/register').post((req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (user) res.json('Username is already registered');
      else {
        bcrypt.hash(password, 10, (error, hash) => {
          const newUser = new User({ username, email, password: hash });

          newUser
            .save()
            .then(() => {
              res.json('User created!');
            })
            .catch((err) => res.status(200).json(`Error: ${err}`));
        });
      }
    })
    .catch((err) => res.statu(400).json(`Error: ${err}`));
});

router.route('/login').post((req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(user.id, process.env.JWT_SECRET);
        res.json({ token });
      } else {
        res.json('Uncorrect password!');
      }
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
