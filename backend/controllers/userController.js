const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminEmails = ['abc@gmail.com','shaneel@gmail.com']; 

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409)
        .json({ message: 'User already exists, you can login', success: false });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);

    if (adminEmails.includes(email)) {
      userModel.isAdmin = true;
    }

    await userModel.save();
    res.status(201)
      .json({
        message: "Signup successful",
        success: true
      });
  } catch (err) {
    res.status(500)
      .json({
        message: "Internal server error",
        success: false
      });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = 'Auth failed, email or password is wrong';
    if (!user) {
      return res.status(403)
        .json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403)
        .json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200)
      .json({
        message: "Login successful",
        success: true,
        jwtToken,
        email,
        name: user.name,
        isAdmin: user.isAdmin
      });
  } catch (err) {
    res.status(500)
      .json({
        message: "Internal server error",
        success: false
      });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, '_id name email isAdmin');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
