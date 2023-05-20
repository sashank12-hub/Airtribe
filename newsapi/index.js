const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
require('dotenv').config()
var morgan = require('morgan')
const app = express();
const redis = require("redis");
const redisClient = redis.createClient();
redisClient.on("connect", () => {
  console.log("Connected to Redis12345");
});

redisClient.on("error", (err) => {
  console.log(err.message);
});
const registerRoutes = require('./Routes/register');
const loginRoutes =require('./Routes/login');
const preferencesRoutes =require('./Routes/preferences');
const newsRoutes = require('./Routes/getnews');
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
routes.get('/', (req, res) => {
    res.status(200).send('welcome to new api');
})
routes.use('/register',registerRoutes);
routes.use('/login',loginRoutes);
routes.use('/preferences',preferencesRoutes);
routes.use('/news',newsRoutes);

const  getOrSetCache = async(key,cb)=>{
    console.log('cmg here1');
    redisClient.get(key,async(err,data)=>{
        if(err)console.log(err);
        if(data!==null){console.log(data); return data};
        const freshData = await cb();
        redisClient.setEx(key,3600,JSON.stringify(freshData)); 
        })
   

}
app.listen(process.env.PORT, (err) => {
    err && console.log('server error');
    !err && console.log('server started', process.env.PORT);
})