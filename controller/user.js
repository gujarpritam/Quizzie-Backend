const QuizzieUser = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const isExistingUser = await QuizzieUser.findOne({ email: email });

    console.log(isExistingUser);

    if (isExistingUser) {
      return res.status(409).json({
        message: "User already exists",
        isExistingUser: isExistingUser,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new QuizzieUser({
      name,
      email,
      password: hashedPassword,
    });

    await userData.save();
    res.json({ isRegistered: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const userDetails = await QuizzieUser.findOne({ email });

    if (!userDetails) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: userDetails._id, name: userDetails.name },
      process.env.SECRET_CODE,
      { expiresIn: "60h" }
    );
    console.log(userDetails.email);

    res.json({
      message: "User logged in",
      token: token,
      email: userDetails.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { registerUser, loginUser };
