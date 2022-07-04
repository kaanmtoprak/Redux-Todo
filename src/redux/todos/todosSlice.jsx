import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
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
const res = await axios.delete(`http://localhost:7000/todos/${id}`);
return id
})


export const todosSlice = createSlice({
    name:'todos',
    initialState:{
        items:[],
        activeFilter: 'all',
        isLoading:false,
        error:null,
        addNewTodo:{
            isLoading:false,
            error:false
        }
    },
    reducers:{

        // toggle:(state,action)=>{
        //     const {id} =action.payload;
        //     const item = state.items.find(item =>item.id === id);

        //     item.completed = !item.completed
        // },
        // destroy:(state,action)=>{
        //     const id = action.payload
        //     const filtered = state.items.filter((item)=> item.id !== id);
        //     state.items = filtered
        // },
        changeActiveFilter:(state,action) =>{
            state.activeFilter = action.payload
        },
        clearCompleted:(state) =>{
            const filtered = state.items.filter(item=>item.completed === false);
            state.items = filtered
        }
    },
    extraReducers:{
        // Get Todos
        [getTodosAsync.pending]:(state,action)=>{
            state.isLoading = true
        },
        [getTodosAsync.fulfilled]:(state,action)=>{
            state.items = action.payload;
            state.isLoading = false
        },
        [getTodosAsync.rejected]: (state,action) =>{
            state.isLoading=false;
            state.error = action.error.message;
        },
        // Add Todo
        [addTodoAsync.pending]: (state,action) =>{
            state.addNewTodo.isLoading =true;
        },
        [addTodoAsync.fulfilled]: (state,action) =>{
            
            state.items.push(action.payload);
            state.addNewTodo.isLoading =false;
        },
        [addTodoAsync.rejected]: (state,action) =>{
            state.addNewTodo.isLoading =false;
            state.addNewTodo.error = action.error.message;
        },
        //Toggle Todo
        [toggleTodoAsync.fulfilled]:(state,action) =>{
            const {id, completed} = action.payload;
            const index = state.items.findIndex(item=>item.id === id);
            state.items[index].completed = completed;
        },
        //remove todo
        [removeTodoAsync.fulfilled]:(state,action) =>{
            console.log(action.payload)
            const id = action.payload
            const filtered = state.items.filter((item)=> item.id !== id);
            state.items = filtered
        }
    }
});

export const selectTodos = state => state.todos.items
export const selectFilteredTodos = (state) =>{
    if(state.todos.activeFilter === 'all'){
        return state.todos.items
    }
    return state.todos.items.filter((todo)=>
    state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true
    )
}
export const SelectActiveFilter = state =>state.todos.activeFilter
export const {changeActiveFilter,clearCompleted} = todosSlice.actions
export default todosSlice.reducer