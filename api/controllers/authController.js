const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const bSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdffafdsfsdgdsgegfegeg';


// Register a new user
const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userInfo = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bSalt),
      });
      res.json(userInfo);
    } catch (err) {
      res.status(422).json(err);
    }
  };

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await User.findOne({ email });
    if (userInfo) {
      const passOk = bcrypt.compareSync(password, userInfo.password);
      if (passOk) {
        jwt.sign({ email: userInfo.email, id: userInfo._id }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userInfo);
        });
      } else {
        res.status(422).json('Wrong Password');
      }
    } else {
      res.json('not found');
    }
  };


// Get user profile
const getUserProfile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      });
    } else {
      res.json(null);
    }
  };

// Logout user
const logoutUser = (req, res) => {
    res.cookie('token', '').json('You are already logged out');
  };

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
};