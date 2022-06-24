import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./components/Header";
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask';
import Task from './components/Task';
import About from './components/About';


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const[tasks, seTasks] = useState([])


  useEffect(()  => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTask()
      seTasks(tasksFromServer)
    }

    getTasks()
  },[])

//Fetch task

const fetchTask = async() => {
  const res = await fetch('http://localhost:11000/tasks')
  const data = await res.json()

  return data
}

//Fetch tasks

const fetchTasks = async(id) => {
  const res = await fetch(`http://localhost:11000/tasks ${id}`)
  const data = await res.json()

  return data
}

// Add Task
const addTask = async (task) => {
  const res = await fetch(`http://localhost:11000/tasks`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  seTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1
  // console.log(id)
  // const newTask =  {id, ...task}
  // seTasks([...tasks, newTask])

}

// Delete task
const deleteTask = async (id) =>{
  await fetch(`http://localhost:11000/tasks/${id}`, {
    method: 'DELETE',
  })

  seTasks(tasks.filter((task)=> task.id !== id))
  console.log('deleted', id)
}

// Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTasks(id)
  const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
  const res = await fetch(`http://localhost:11000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  })

  const data = await res.json()


  seTasks(
    tasks.map((task) => 
    task.id === id ? {...task, reminder: 
      data.reminder} : task))
  
  
}


  return (
    <Router>

    <div className='container'>
    <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
    {showAddTask && <AddTask onAdd={addTask}/>}
    {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : ('No Task to show.')}
     
    
     <Footer />
     <About/>
     </div>
     </Router>
  )
}


export default App;
