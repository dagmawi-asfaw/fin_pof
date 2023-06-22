import API from "./base_url";
import  TaskModel from "../models/task_model";

 class TaskRepository { 



static  async  getTasks()  {
        
    const response = await API.get('/task',);
    return response.data;
    }


 static async   addTask(task: TaskModel): Promise<Boolean> {    
         try {
             await API.post('/task', {
                id:task.id,
                 description: task.description,
                 unit: task.unit,
                 quantity: task.quantity,
                 rate: task.rate,
                 amount: task.amount
             }) 
             return true;
         }
         catch (e) { 
             return false;
         }
     }

     static async   updateTask(id:Number,task: TaskModel): Promise<Boolean> {    
        try {
            await API.put(`/task/${id}`, {
                id:task.id,
                description: task.description,
                unit: task.unit,
                quantity: task.quantity,
                rate: task.rate,
                amount: task.amount
            }) 
            return true;
        }
        catch (e) { 
            return false;
        }
    }

    
static   async  removeTask(id: Number): Promise<Boolean> {    
        try {
       await API.delete(`/task/${id}`) 
            return true;
        }
        catch (e) { 
            return false;
        }
    }
}


export default TaskRepository;