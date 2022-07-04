import {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Error from './Error';
import {toggleTodoAsync,getTodosAsync,removeTodoAsync} from '../redux/todos/services';
import {selectFilteredTodos} from '../redux/todos/todosSlice';



const TodoList = () => {

    const dispatch = useDispatch()
    const filteredTodos = useSelector(selectFilteredTodos)

    const isLoading = useSelector(state =>state.todos.isLoading)
    const error = useSelector(state =>state.todos.error)

    
    useEffect(()=>{
        dispatch(getTodosAsync());
    },[dispatch])


    const handleToggle = async (id,completed)=>{
        await dispatch(toggleTodoAsync({id, data: {completed}}))
    }






    if(isLoading){
        return <div>Loading</div>
    }
    if(error){
        return <Error message={error}/>;
    }


  return (
    <ul className="todo-list">
        {/* <li className="completed">
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Learn JavaScript</label>
                <button className="destroy"></button>
            </div>
        </li> */}

        {
            filteredTodos.map((item)=>(


                <li key={item.id} className={item.completed ? 'completed' : ''}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={item.completed} onChange={()=>handleToggle(item.id, !item.completed)} />
                    <label>{item.title}</label>
                    <button className="destroy" onClick={async ()=>await dispatch(removeTodoAsync(item.id))}></button>
                </div>
            </li>


            ))
        }

    </ul>
  )
}

export default TodoList