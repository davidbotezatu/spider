const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { email, parola } = req.body;
    const user = await User.findOne({ where: { email } });
    const verifyPass = await bcrypt.compare(parola, user.parola);

    if (!user || !verifyPass) {
      return res.status(401).json({ message: "User sau parola incorecte" });
    }

    res.status(200).json({ message: "Login reusit" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
