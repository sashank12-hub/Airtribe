const routes = require('express').Router();
const Login =require('../controllers/login');

routes.post('/',Login);
module.exports =routes;