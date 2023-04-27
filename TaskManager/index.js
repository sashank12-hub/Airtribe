const express = require('express');
const routes = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const TasksController = require('./Routes/Tasks');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.get('/', (req, res) => { res.status(200).send('welcome to task manager') });
routes.use('/tasks', TasksController);
app.listen(PORT, (err) => {

    !err && console.log('server started')
    err && console.log(err);
})