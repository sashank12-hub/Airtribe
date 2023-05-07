const routes =require('express').Router();
const News = require('../controllers/news');
const verifyToken = require('../middleware/verifyToken');
// const Redis = require('./cache/redisCache');
//verifyToken
//Redis.Cache
routes.get('/',News);
module.exports =routes;
