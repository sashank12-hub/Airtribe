const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const users = require("../Users.json");
var string = require("string-sanitizer");

const Register = (req, res) => {
  const { email, password, name, preference } = req.body;
  if (!email || !password || !name) {
    return res.status(500).send("missing fields email/password/name");
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || !string.validate.isEmail(email)) {
    return res.status(400).send({ message: "invalid email" });
  }
  const writePath = path.join(__dirname, "..", "Users.json");

  const existingUsers = JSON.parse(JSON.stringify(users));
  const isUserExist = existingUsers.some((user) => user.email === email);
  if (isUserExist) {
    return res.status(400).send({ message: "email already exist. pls login" });
  }
  fs.writeFile(
    writePath,
    JSON.stringify([
      ...existingUsers,
      {
        name,
        email,
        password: bcrypt.hashSync(password, 8),
        preference: preference?.split(",") || [],
      },
    ]),
    { encoding: "utf8", flag: "w" }
  );

  return res.status(200).send({ message: `successfully registered ${name}` });
};

module.exports = Register;
