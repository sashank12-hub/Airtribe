class Validator {
    static validateFieldLength(Task, field) {
        console.log(Task, field, Task[field]);
        return Task[field].length > 0

    }
    static validateNewTask(Task) {
        if (
            Task.hasOwnProperty("title") &&
            Task.hasOwnProperty('description') &&
            Task.hasOwnProperty('completionStatus')
            && (Task.completionStatus === false || Task.completionStatus === true) &&
            this.validateFieldLength(Task, 'title') && this.validateFieldLength(Task, 'description')
        ) {
            return {
                status: true,
                reason: 'task has been added successfully'
            }
        }
        return {
            status: false,
            reason: 'Incorrect Task data, please re check if all fields are present'
        }
    }
}

//curl -X POST -d '{"title": "gym","level":"low","description":"helo","completionStatus":false}' -H 'Content-Type: application/json' 'http://localhost:3000/tasks' 

//curl -X PUT -d '{"completionStatus":"true","level":"medium"}' -H 'Content-Type: application/json' 'http://localhost:3000/tasks/1' 

module.exports = Validator;

//curl -X PUT -d '{"completionStatus":"true","level":"medium","title":""}' -H 'Content-Type: application/json' 'http://localhost:3000/tasks/1' 
//curl -X DELETE  -H 'Content-Type: application/json' 'http://localhost:3000/tasks/2' 