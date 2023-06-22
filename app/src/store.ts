import { configureStore, createSlice, createStore } from '@reduxjs/toolkit'
import taskReducer from './slices/task_slice'
 
import { useDispatch } from 'react-redux';
 
const store = configureStore({
    reducer: taskReducer
});
  

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;


export default store