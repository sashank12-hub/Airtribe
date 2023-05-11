const routes = require('express').Router();
const {getPreferences,putPreferences} =require('../controllers/preferences');
const verifyToken = require('../middleware/verifyToken');

routes.put('/',verifyToken,putPreferences);
routes.get('/',verifyToken,getPreferences);
module.exports =routes;