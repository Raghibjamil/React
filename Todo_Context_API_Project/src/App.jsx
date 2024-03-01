
import './App.css'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { TodoProvider } from './contexts/TodoContext'
import { useState,useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([]);

  // here we are defining the functionality to add the Todo.......
  const addTodo=(todo)=>{
    setTodos((prev)=> ([{id:Date.now(),...todo},...prev]))

  }

  // here we are defining the functionlity of updatetodo.....

  const  updateTodo=(id, todo)=>{
    setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id === id?  todo:prevTodo)))

  }

  // here we are defining the functionality of deleteTodo....
  // filter always return array....
  const deleteTodo=(id)=>{
    setTodos((prev)=> prev.filter((todo)=> (todo.id !== id)))

  }

  // here we are defining the functionality of toggleComplete...........

  const toggleComplete=(id)=>{
setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, completed:!prevTodo.completed}:prevTodo))
  }
// here we getting the data from local storage.........
useEffect(()=>{
  const todos=JSON.parse(localStorage.getItem("todos"));
  if(todos && todos.length >0){
    setTodos(todos);
  }
},[])

// here we setting the data to local storage............

// isnide the local value stored inside it ....is string value and get string value feom local storage.....

useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos));

},[todos])



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/> 
        </div>
        <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
        </div>
    </div>
</div>
</TodoProvider>
  )
}

export default App;
