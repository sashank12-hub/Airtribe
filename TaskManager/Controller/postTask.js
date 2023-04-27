const fs =require('fs');
const Validater = require('../validator');
const path = require('path');

const postTask = (req,res,tasksData)=>{
    const writepath = path.join(__dirname, '..', 'tasks.json');
    const Task = req.body;
    let validateTask = Validater.validateNewTask(Task);
    if (validateTask.status) {
        let modifiedTasks = JSON.parse(JSON.stringify(tasksData));
        const date = new Date();
        const modifiedTask = {
            title: Task.title,
            description: Task.description,
            completionStatus: Task.completionStatus,
            id: modifiedTasks.length,
            creationDate: date.getTime(),
            level: Task.level || 'low',
        }
        modifiedTasks.push(modifiedTask)
        fs.writeFileSync(writepath, JSON.stringify(modifiedTasks), { encoding: 'utf8', flag: 'w' });
        res.status(200).send({ "message": validateTask.reason });
    }
    else {
        res.status(400).send({ "message": validateTask.reason });
    }
}

module.exports =postTask;