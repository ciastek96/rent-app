const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const Account = require('../models/accounts');

router.route('/').get(async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (user) res.status(409).send('Podana nazwa użytkownika jest już zajęta.');
      else {
        bcrypt.hash(password, 10, (error, hash) => {
          const newUser = new User({ username, email, password: hash });

          newUser
            .save()
            .then(() => {
              User.findOne({ username })
                .then((response) => {
                  const newAccount = new Account({ userID: response._id, email, username });

                  newAccount
                    .save()
                    .then(() => {
                      res.status(201).send('Pomyślnie stworzono użytkownika. Teraz możesz się zalogować.');
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => res.status(400).json(`Error: ${err}`));
        });
      }
    })
    .catch((err) => res.statu(400).json(`Error: ${err}`));
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  try {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userID: user._id, username: user.username }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } else {
      res.status(401).json('Nieprawidłowe hasło. ');
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

router.patch('/updatePassword/:id', async (req, res) => {
  const { id: _id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No users with that ID');

  const user = await User.findById({ _id });

  try {
    if (bcrypt.compareSync(currentPassword, user.password)) {
      bcrypt.hash(newPassword, 10, async (error, hash) => {
        await User.findByIdAndUpdate({ _id }, { password: hash }, { new: true });
        res.status(201).json('Hasło zaaktualizowane. ');
      });
    } else {
      res.status(401).json('Nieprawidłowe hasło. ');
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = router;
