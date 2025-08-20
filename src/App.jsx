
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppName from './Components/AppName'
import AddTodo from './Components/AddTodo'
import TodoItems from './Components/TodoItems'

function App() {

   const todoItem = [{
    todoName : "Buy Milk",
    todoDate : "04/10/2023"
   },
   
   {
    todoName : "Buy Toast",
    todoDate : "05/10/2023",
   },

   {
    todoName : "Learn React",
    todoDate : "06/10/2025",
   }
  ]

  return (
  <center className='Todo-container'>
    <AppName></AppName>
    <AddTodo></AddTodo>
    <TodoItems todoItem={todoItem}></TodoItems>
  </center>
  )
}

export default App
