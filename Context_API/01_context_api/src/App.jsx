
import React from 'react'
import Login from './components/Login'
import Profile from './components/Profile'
import UserContextProvider from './context/UserContextProvider'
import './App.css';

function App() {


  return (
    <UserContextProvider>
      <h1 className='bg-slate-500 text-3xl'>this is context Api project</h1>
      <Login />
      <Profile/>
    </UserContextProvider>
    
    
  )
}

export default App
