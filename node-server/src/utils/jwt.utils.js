const { sign, verify } = require("jsonwebtoken");

const dbConfig = require("../../config/db.config");

function signJwt(object, options) {
  return sign(object, dbConfig.privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

function verifyJwt(token) {
  try {
    const decoded = verify(token, dbConfig.publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}

module.exports = { signJwt, verifyJwt };
