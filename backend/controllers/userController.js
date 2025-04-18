const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    const user = new User({ username, password, isAdmin });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, getAllUsers };