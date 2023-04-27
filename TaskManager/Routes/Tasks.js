const routes = require('express').Router();
const bodyParser = require('body-parser');
const tasksData = require('../tasks.json');
const getTasks =require('../Controller/getRequest');
const getTaskBYId =require('../Controller/getById');
const getByLevel = require('../Controller/getByLevel');
const postTask =require('../Controller/postTask');
const deleteTask =require('../controller/deleteTask');
const putTask =require('../Controller/putTask');
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

routes.get('/', (req, res) => {
    getTasks(req,res,tasksData)
})

routes.get('/:id', (req, res) => {
    getTaskBYId(req,res,tasksData)
})

routes.get('/priority/:level', (req, res) => {
    getByLevel(req,res,tasksData)
})
routes.post('/', (req, res) => {
 postTask(req,res,tasksData);
})

routes.delete('/:id', (req, res) => {
    deleteTask(req,res,tasksData)
})

routes.put('/:id', (req, res) => {
    putTask(req,res,tasksData);
})







module.exports = routes;