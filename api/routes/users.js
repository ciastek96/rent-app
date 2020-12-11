const router = require('express').Router();
const User = require('../models/users');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/register').post((req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });

  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/login').post((req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((users) => {
      if (users.password !== password) {
        res.json('Uncorrect password');
      } else res.json(users);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
