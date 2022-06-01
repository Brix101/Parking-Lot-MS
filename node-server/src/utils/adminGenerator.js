const { User } = require("../models");
const adminGenerator = async () => {
  const res = await User.findAndCountAll();
  if (res.count === 0) {
    await User.create({
      firstName: "Juan",
      lastName: "Dela Cruz",
      userName: "juandc",
      email: "juandelacruz@email.com",
      password: "password",
      isAdmin: true,
    });
  }
};

module.exports = { adminGenerator };
