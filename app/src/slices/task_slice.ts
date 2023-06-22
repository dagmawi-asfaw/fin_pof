import {   createSlice,createAsyncThunk } from '@reduxjs/toolkit'
 
import TaskRepository from "../api/task_repository";
import TaskModel from "../models/task_model";


export const getTasks = createAsyncThunk('task/getTasks', async () => { 
    const tasks = await TaskRepository.getTasks();
    return tasks;	
});

export const removeTask = createAsyncThunk('task/removeTask', async (id: Number, thunkApi) => {
   await TaskRepository.removeTask(id);
});


export const addTask = createAsyncThunk('task/addTask', async (task: TaskModel, thunkApi) => { 
  const res =   await TaskRepository.addTask(task);
 return res;      
});


export const updateTask = createAsyncThunk('task/updateTask', async (task:TaskModel, thunkApi) => { 
    const res = await TaskRepository.updateTask(task.id,task);
    return res;      
  });





const  taskSlice = createSlice(
    {
        name: 'task',
        initialState: {
            data: []  ,
            status:'idle'
        },
        reducers: {}, 
        extraReducers: (builder) => { 

            builder.addCase(getTasks.pending, (state,action) => { 
                state.status = 'loading';
            }).addCase(getTasks.fulfilled, (state,action) => { 
                state.status = 'done';
                state.data = action.payload;
            }).addCase(getTasks.rejected, (state,action) => { 
                state.status = 'failed';
            }).addCase(addTask.pending, (state,action) => { 
                state.status = 'loading';
            }).addCase(addTask.fulfilled, (state,action) => { 
                state.status = 'done';
            }).addCase(addTask.rejected, (state,action) => { 
                state.status = 'failed';
            }).addCase(removeTask.pending, (state,action) => { 
                state.status = 'loading';
            }).addCase(removeTask.fulfilled, (state,action) => { 
                state.status = 'done';
            }).addCase(removeTask.rejected, (state,action) => { 
                state.status = 'failed';
            })     
        }
    }
)


export default taskSlice.reducer;