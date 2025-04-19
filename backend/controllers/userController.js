const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    
    const userexist = await User.findOne({ username: username });
    if (userexist) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ username, password, isAdmin });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//  const getAllUsers = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;

//         const skip = (page - 1) * limit;
//         const totalItems = await User.countDocuments();

//         const users = await User.find()
//             .skip(skip)
//           .limit(limit);
//       console.log(users);

//         res.status(200).json({
//             users,
//             totalItems,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
//  };

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalItems = await User.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    // Optional: If skip is more than totalItems, reset page to 1
    if (skip >= totalItems && totalItems > 0) {
      return res.status(400).json({
        message: "Page number is too high.",
        totalItems,
        totalPages
      });
    }

    const users = await User.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      users,
      totalItems,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { createUser, getAllUsers };