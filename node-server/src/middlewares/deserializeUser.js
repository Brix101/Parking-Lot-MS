const { verifyJwt } = require("../utils/jwt.utils");
const { User } = require("../models");

const deserializeUser = async (req, res, next) => {
  const accessToken =
    req.headers && req.headers.authorization
      ? req.headers.authorization.replace(/^Bearer\s/, "")
      : null;

  const refreshToken =
    req.cookies && req.cookies.refreshToken ? req.cookies.refreshToken : null;

  if (!refreshToken) {
    res.removeHeader("authorization");
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const { decoded } = verifyJwt(refreshToken);
    if (decoded) {
      const user = await User.findByPk(decoded.id);
      const newAccessToken = user.getAccessToken();

      res.setHeader("authorization", newAccessToken);
      console.log("send");
      const newDecoded = verifyJwt(newAccessToken);

      res.locals.user = newDecoded.decoded;
    }
    return next();
  }
  next();
};

module.exports = deserializeUser;
