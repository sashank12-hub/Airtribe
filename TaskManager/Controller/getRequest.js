
const Sort = (sort, tasksData) => {
   if (sort === 'asc') {
      let modifiedtask = tasksData.sort((task1, task2) => task1.creationDate - task2.creationDate)
      return modifiedtask
   }
   if (sort === 'desc') {
      let modifiedtask = tasksData.sort((task1, task2) => task2.creationDate - task1.creationDate)
      return modifiedtask
   }
}

const getTasks = (req, res, tasksData) => {
   let status = req.query.completionStatus;
   let sort = req.query.sort;
   let modifiedTask = tasksData;
   if (status) {
      let completionStatus;
      if (status === 'true') {
         completionStatus = true;
      }
      if (status === 'false') {
         completionStatus = false;
      }
      modifiedTask = tasksData.filter((task) => task.completionStatus === completionStatus);

   }
   if (sort) {
      modifiedTask = Sort(sort, modifiedTask);
   }

   return res.status(200).send(modifiedTask);
}


module.exports = getTasks;