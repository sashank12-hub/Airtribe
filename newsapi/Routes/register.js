const routes = require('express').Router();
const Register =require('../controllers/register');

routes.post('/',Register);
module.exports =routes;