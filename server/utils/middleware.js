const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis.config");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(400).send({ message: "Lipseste auth header" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(400).send({ message: "Lipseste token-ul" });

  if (await redisClient.exists(token))
    return res.status(400).send({ message: "Token utilizat" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });
    req.user = payload;
    next();
  });
};

exports.isRequiredPassChange = (req, res, next) => {
  if (req.user.schimbaParola) {
    return res.status(403).json({ message: "Parola trebuie schimbata." });
  }

  next();
};
