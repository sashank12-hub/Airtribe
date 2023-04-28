const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const users = require('../Users.json');

const Register = (req, res) => {
  const { email, password, name, preference } = req.body;
  (!email || !password || !name) && res.status(500).send('missing fields email/password/name');
  const writePath = path.join(__dirname, '..', 'Users.json');

  const existingUsers = JSON.parse(JSON.stringify(users));
  const isUserExist = existingUsers.some(user => user.email === email);
  isUserExist && res.status(400).send({ "message": "email already exist. pls login" })

  fs.writeFileSync(writePath, JSON.stringify([...existingUsers, {
    name,
    email,
    password: bcrypt.hashSync(password, 8),
    preference: preference.split(",")||[],
  }]), { encoding: 'utf8', flag: 'w' })

  res.status(200).send({ "message": `successfully registered ${name}` });
}

module.exports = Register;