const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const users = require("../Users.json");
const jwt = require("jsonwebtoken");
const fetchNews =require('../helpers/index');
var string = require("string-sanitizer");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'backendtesting@gmail.com',
    pass: ''
  }
});
let mailDetails = {
  from: 'backendtesting@gmail.com',
  to: 'chavalysashank@gmail.com',
  subject: 'Test mail',
  text: 'Node.js testing mail for GeeksforGeeks'
};

const Login = async(req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "missing field email/password" });
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)|| !string.validate.isEmail(email)) {
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
       res.status(200).send({ message: "log in success", token: token });
    //    transporter.sendMail(mailDetails, function(err, data) {
    //     if(err) {
    //         console.log('Error Occurs',err);
    //     } else {
    //         console.log('Email sent successfully',data);
    //     }
    // });
      
      
    }
  }
};

module.exports = Login;



//vxefwssnmbrcxrgg