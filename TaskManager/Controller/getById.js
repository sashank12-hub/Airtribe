const getTaskBYId =(req,res,tasksData) =>{
    const id = req.params.id;
    const task = tasksData.filter(item => item.id === parseInt(id));
    task.length > 0 &&  res.status(200).send(JSON.stringify(task));
    task.length === 0 && res.status(400).send({ 'err': `no task found with id ${id}` });
}


module.exports =getTaskBYId;