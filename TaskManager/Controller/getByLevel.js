const getByLevel = (req,res,tasksData)=>{
    const levelTasks = tasksData.filter(item => item.level === req.params.level);
    res.status(200).send(JSON.stringify(levelTasks));
}

module.exports=getByLevel;