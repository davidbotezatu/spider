const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis.config");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (req.user.schimbaParola) {
    return res.status(403).json({ message: "Parola trebuie schimbata." });
  }

  if (!authHeader) return res.status(403).send({ message: "Forbidden" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(403).send({ message: "Forbidden" });

  if (await redisClient.exists(token))
    return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });
    req.user = payload;
    next();
  });
};
