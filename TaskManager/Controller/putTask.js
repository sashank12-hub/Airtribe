const fs =require('fs');
const Validater = require('../validator');
const path = require('path');

const putTask =(req,res,tasksData)=>{
    const writepath = path.join(__dirname, '..', 'tasks.json');
    const id = req.params.id;
    const Task = tasksData.find(item => item.id === parseInt(id));
    const params = req.body;
    if (Task) {
        let tasks = JSON.parse(JSON.stringify(tasksData));
        const modifiedTask = {
            title: (params.hasOwnProperty('title') ? params.title : Task.title),
            description: (params.hasOwnProperty('description') ? params.description : Task.description),
            completionStatus: (params.hasOwnProperty('completionStatus') ? params.completionStatus : Task.completionStatus),
            id: Task.id,
            creationDate: Task.creationDate,
            level: params.level || Task.level,
        }
        console.log(modifiedTask,'sashank');
        if (Validater.validateFieldLength(modifiedTask, 'description') && Validater.validateFieldLength(modifiedTask, 'title') && (modifiedTask.completionStatus === true || modifiedTask.completionStatus === false)) {
            const newTasks = tasks.filter(task => task.id !== parseInt(id));
            fs.writeFileSync(writepath, JSON.stringify([...newTasks, modifiedTask]), { encoding: 'utf8', flag: 'w' });
            res.status(200).send({"message":"task has been modified"});
        }
        else {
            res.status(400).send({ "message": 'pls validate all fields' });
        }
    }
    else {
        res.status(400).send({ "message": 'No task found' })
    }
}
module.exports =putTask;