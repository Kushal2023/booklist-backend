const express = require("express");
const User = require("../schemas/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC),
  });

  try {
    const saveduser = await newUser.save();
    res.status(200).json(saveduser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json("Wrong Credentials");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (hashedPassword !== req.body.password) {
      return res.status(401).json("Wrong Credentials");
    }

    const accesstoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accesstoken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
