# TaskManager
The folowing requests can be made on the endpoint http://localhost:3000/tasks

1.http://localhost:3000/tasks ( get all tasks)
2.http://localhost:3000/tasks/:id (get task by id)
3.http://localhost:3000/tasks (post new task with payload {"title": "gym","level":"low","description":"helo","completionStatus":false})
4. http://localhost:3000/tasks/:id ( PUT to modify existing task )
5.http://localhost:3000/tasks/:id(DELETE task by id)


CURL COMMANDS
1. curl -H 'Content-Type: application/json'  'http://localhost:3000/tasks'
2. curl -H 'Content-Type: application/json'  'http://localhost:3000/tasks/:id'
3. curl -X DELETE  -H 'Content-Type: application/json' 'http://localhost:3000/tasks/:id'
4. curl -X POST -d '{"title": "gym","level":"low","description":"helo","completionStatus":false}' -H 'Content-Type: application/json' 'http://localhost:3000/tasks'
5. curl -X PUT -d '{"completionStatus":"true","level":"medium"}' -H 'Content-Type: application/json' 'http://localhost:3000/tasks/1' 


The following is the expected json format for new Task

{title: "some title", // non empty
description:"some description", // non empty
level:"low", // low/high/medium
completionStatus: true // boolean value
}

user can also fetch tasks by filtering based on completeionstatus or sort by creation date using below query

http://localhost:3000/tasks?sort=asc&completionStatus=false

asc for ascending order
desc for descending order
