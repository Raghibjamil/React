import { useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { store } from './app/store'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Provider store={store}>
      <h1 className="text-3xl font-bold underline">
        TODO APP
      </h1>
     <AddTodo/>
      <Todos/>
      </Provider>
  )
}

export default App
