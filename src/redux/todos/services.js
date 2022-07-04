import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync',async ()=>{
    const res = await axios('http://localhost:7000/todos');
    return await res.data
});
export const addTodoAsync = createAsyncThunk('todos/addTodoAsync',async (data)=>{
    const res = await axios.post('http://localhost:7000/todos',data)
    return res.data
});
export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async({id,data})=>{
    const res = await axios.patch(`http://localhost:7000/todos/${id}`,data)
    return res.data
});
export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async(id)=>{
await axios.delete(`http://localhost:7000/todos/${id}`);
return id
});
