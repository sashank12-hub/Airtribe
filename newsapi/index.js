const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
require('dotenv').config()
const app = express();
const registerRoutes = require('./Routes/register');
const loginRoutes =require('./Routes/login');
const preferencesRoutes =require('./Routes/preferences');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
routes.get('/', (req, res) => {
    res.status(200).send('welcome to new api');
})
routes.use('/register',registerRoutes);
routes.use('/login',loginRoutes);
routes.use('/preferences',preferencesRoutes);
app.listen(process.env.PORT, (err) => {
    err && console.log('server error');
    !err && console.log('server started', process.env.PORT);
})