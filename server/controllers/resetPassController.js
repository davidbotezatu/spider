require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const { resetareParola, schimbareParola } = require("../utils/emailTemplates");
const { redisClient } = require("../config/redis.config");

exports.resetPassReq = async (req, res) => {
  try {
    const { email } = req.body;
    const user = User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({ message: "Emailul nu a fost gasit" });

    var resetToken = jwt.sign({ email }, process.env.RESET_PASS_SECRET, {
      expiresIn: "2h",
    });

    const em = resetareParola(resetToken);
    sendEmail(email, em.subiect, em.text);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.passUpdate = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(400).send({ message: "Lipseste auth header" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(400).send({ message: "Lipseste token-ul" });

    if (await redisClient.exists(token))
      return res.status(400).send({ message: "Token utilizat" });

    jwt.verify(token, process.env.RESET_PASS_SECRET, async (err, decoded) => {
      if (err) return res.status(401).send({ message: "Unauthorized" });

      const { parola } = req.body;
      const hashedPass = await bcrypt.hash(parola, 10);

      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user)
        return res.status(404).json({ message: "Emailul nu a fost gasit" });
      await user.update({ parola: hashedPass });

      const expTimeLeft = decoded.exp - Math.floor(Date.now() / 1000);
      if (expTimeLeft > 0)
        await redisClient.set(token, "revoked", "EX", expTimeLeft);

      res.status(200).json({ message: "Parola a fost resetata" });
      sendEmail(decoded.email, schimbareParola.subiect, schimbareParola.text);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
