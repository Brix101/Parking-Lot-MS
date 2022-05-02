const requiredUser = async (req, res, next) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  next();
};

module.exports = requiredUser;
