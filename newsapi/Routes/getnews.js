const routes =require('express').Router();
const News = require('../controllers/news');
const verifyToken = require('../middleware/verifyToken');
routes.get('/',verifyToken,News);
module.exports =routes;
