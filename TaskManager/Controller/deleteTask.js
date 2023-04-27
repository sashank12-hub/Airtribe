const fs =require('fs');
const path = require('path');

const deleteTask = (req,res,tasksData)=>{
    const writepath = path.join(__dirname, '..', 'tasks.json');
    const id = req.params.id;
    const task = tasksData.some(item => item.id === parseInt(id));
    if (task) {
        let tasks = JSON.parse(JSON.stringify(tasksData));

        const newTasks = tasks.filter(task => task.id !== parseInt(id));
        fs.writeFileSync(writepath, JSON.stringify(newTasks), { encoding: 'utf8', flag: 'w' });
        res.status(200).send({ "message": "deleted successfully" });
    }
    else {
        res.status(400).send({ "message": 'No task found' })
    }
}

module.exports =deleteTask;