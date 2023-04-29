const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const users = require("../Users.json");
const jwt = require("jsonwebtoken");

const Login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "missing field email/password" });
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).send({ message: "invalid email" });
  }

  const isUserExist = users.find((user) => user.email === email);
  if (!isUserExist) {
    res.status(400).send({ message: "pls create account" });
  }
  if (isUserExist) {
    const isPasswordMatch = bcrypt.compareSync(password, isUserExist.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ message: "verify your password" });
    } else {
      const token = jwt.sign({ email, password }, process.env.SECRET, {
        expiresIn: 86400,
      });
      return res.status(200).send({ message: "log in success", token: token });
    }
  }
};

module.exports = Login;
