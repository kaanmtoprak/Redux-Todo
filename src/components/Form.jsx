import {useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Error from './Error'


import { addTodoAsync } from '../redux/todos/services'

const Form = ({message}) => {
	const [title,setTitle] = useState('')
	const dispatch = useDispatch()
	const isLoading = useSelector(state=>state.todos.addNewTodo.isLoading)
	const error = useSelector(state=>state.todos.addNewTodo.error)
	const handleSubmit =async (e) =>{
		e.preventDefault()
		console.log('test')
		if(!title) return

		await dispatch(addTodoAsync({title}))
		setTitle('')
	}

  return (
    
        		<form style={{display:'flex',alignItems:'center'}} onSubmit={handleSubmit}>
			<input disabled={isLoading} className="new-todo" placeholder="Bir Şey Ekle..." autoFocus value={title} onChange={(e)=>setTitle(e.target.value)} />
			{
				isLoading && <span style={{paddingRight:10}}>Loading...</span>
			}
			{
				error && <Error message={message}/>
			}
		</form>
    
  )
}

export default Form