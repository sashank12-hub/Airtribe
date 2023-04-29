const users = require("../Users.json");
const fs = require("fs");
const path = require("path");
const userData = JSON.parse(JSON.stringify(users));
const getPreferences = (req, res) => {
  const { email, message } = req.body;
  !email && res.status(401).send({ message: message });
  if (email) {
    const preference =
      userData?.find((user) => user.email === email)?.preference || [];

    res.status(200).send({ preference: preference });
  }
};

const putPreferences = (req, res) => {
  const writepath = path.join(__dirname, "..", "Users.json");
  const { email, message, preference } = req.body;
  !email && res.status(401).send({ message: message });
  if (email) {
    const updatedUser = userData.map((user) => {
      if (user.email === email) {
        user.preference = preference.split(" ");
      }
      return user;
    });
    fs.writeFileSync(writepath, JSON.stringify([...updatedUser]));
    res.status(200).send({ message: "preferences updated" });
  }
};

module.exports = { putPreferences, getPreferences };
