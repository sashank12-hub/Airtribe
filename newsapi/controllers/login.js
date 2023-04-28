const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const users = require('../Users.json');
const jwt =require('jsonwebtoken');

const Login = (req,res)=>{
    const {email,password} = req.body;
   ( !email || !password ) && res.status(400).send({"message":"missing field email/password"});

   const isUserExist =  users.find(user=>user.email===email);

   !isUserExist && res.status(400).send({"message":"pls create account"});
   if(isUserExist){
    const isPasswordMatch = bcrypt.compareSync(password,isUserExist.password);
    !isPasswordMatch && res.status(400).send({"message":"verify your password"});
 
 if(isPasswordMatch){
     const token = jwt.sign({email,password},process.env.SECRET,{expiresIn: 86400})
     res.status(200).send({"message":"log in success",token:token})
 }
   }

}


module.exports =Login;