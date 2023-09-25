var jwt = require("jsonwebtoken");

function AuthenticationMiddleware(req, res, next) {

  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(404).json({ message: "Authorization header missing" });
    }

    jwt.verify(token, "1010FVSBYSEIUWTOE");

    return next();
  } catch {
    return res.send(401).json({ message: "Invalid token" });
  }
}

module.exports =  AuthenticationMiddleware;
