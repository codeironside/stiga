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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;
        const totalItems = await User.countDocuments();

        const users = await User.find()
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            users,
            totalItems,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 };

module.exports = { createUser, getAllUsers };