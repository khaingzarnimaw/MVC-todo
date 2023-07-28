import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import { useCallback, useEffect, useState } from "react";
import { prettyDOM } from "@testing-library/react";

function App() {
  //2
  let [todos, setTodos] = useState([]);
  let [filteredTodos,setFilteredTodos] = useState(todos);//todos ကို default အနေနဲ့ ထည့်ပေးလိုက်

  //1
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos)
        setFilteredTodos(todos) 
        // console.log("hit");
      }, []);
  }, [])

  //Filter// နောက်ဆုံး 
   let filterBy = useCallback (
    (filter)=>{
      if(filter === 'All'){
       setFilteredTodos(todos);
      }
      if(filter === 'Active'){
       setFilteredTodos(todos.filter(t=>!t.completed))
      }
      if(filter === 'Completed'){
      setFilteredTodos(todos.filter(t=> t.completed))
      }
     },[todos]
   )


  // 15 //todo updat & api ကို delete လုပ်ဖို့လို
  let addTodo = (todo) => {
    //23 post method 
    //16//update data at server side(main)
    fetch('http://localhost:3001/todos',{
      method : "POST",
      headers: {
        "Content-Type": "application/json"},
      body : JSON.stringify(todo)
    })//post method ကိုသုံး/update တွေကိုသိမ်းမှာ//fetch post method

    //17//update data at client side(main)
    setTodos(prevState => [...prevState,todo])
  }

  // deleteTodo
  let deleteTodo = (todoId) => {
    //server //main
   fetch(`http://localhost:3001/todos/${todoId}`,{
    method : "DELETE" 
   })
    //client
    setTodos(prevState => {
     return prevState.filter(todo => {
      return todo.id !== todoId
     });//[todo,todo] todoId//မတူတဲ့ကောင်တွေပဲ ကျန်ခဲ့မယ်/တူတဲ့ကောင်တွေက ပြုတ်သွားမယ်
    })  
  }

  //updateTodo
  let updateTodo = (todo)=>{
    // console.log("hit ",todo);// Todo.js ကပို့တဲ့ data ၀င်မ၀င် check
    //server
    fetch(`http://localhost:3001/todos/${todo.id}`,{
      method : "PATCH",
      headers: {
        "Content-Type": "application/json"},
      body : JSON.stringify(todo)
    })
    
    //client
    setTodos(prevState =>{
      return prevState.map( t =>{
        if(t.id === todo.id){//t.id =loop ပတ်ပီးထွက်လာတဲ့ id
                            //todo.id= ပြင်ချင်တဲ့ id
          return todo
        }
        return t;//old todo
      })
    })
  }

  //remaining count
  let remainingCount = todos.filter(t => !t.completed).length

  //Check All 
  let checkAll = () => {
    //server
    todos.forEach(t =>{
      t.completed = true;
      updateTodo(t)
    })
    //client 
    setTodos((prevState)=>{
      return prevState.map(t => {
        return {...t,completed : true}
      })
    })
  }

  //ClearCompleted
  let clearCompleted = ()=>{
     //server
    todos.forEach( t=> {
      if(t.completed){
        deleteTodo(t.id)
      }
    })
     //client
    setTodos((prevState)=> {
      return prevState.filter(t => !t.completed)//မပီးသေးတဲ့ todo တွေကိုပြန်ပေးမှာပါ
    })
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        {/* 18 */}
        <TodoForm  addTodo={addTodo}/> 

        {/* 3 */}
        <TodoList todos={filteredTodos}  deleteTodo={deleteTodo} updateTodo={updateTodo}/> 
        <CheckAllAndRemaining remainingCount={remainingCount} checkAll={checkAll}/>
        <div className="other-buttons-container">
          <TodoFilters filterBy={filterBy}/>
          <ClearCompletedBtn clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
