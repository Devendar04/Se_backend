const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
    const token =
    (req.cookies && req.cookies.token) ||
    (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized token" });
    }

    const isBlacklisted = await userModel.findOne({ token : token });

    if(isBlacklisted){
        return res.status(401).json({ message: "Unauthorized: token is blacklisted" });
    }

    try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized:user not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized! Invalid token." });
    }
    return res.status(401).json({ message: "Unauthorized! Token verification failed." });
  }
};
