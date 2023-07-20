import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import { useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        // console.log("hit");
      }, []);
  }, []);

  //todo updat & api ကို delete လုပ်ဖို့လို
  let addTodo = (todo) => {
    //update data at server side(main)
    fetch('http://localhost:3001/todos',{
      method : "POST",
      headers: {
        "Content-Type": "application/json"},
      body : JSON.stringify(todo)
    })//post method ကိုသုံး/update တွေကိုသိမ်းမှာ//fetch post method


    //update data at client side(main)
    setTodos(prevState => [...prevState,todo])
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm  addTodo={addTodo}/> 
        <TodoList todos={todos} />
        <CheckAllAndRemaining />
        <div className="other-buttons-container">
          <TodoFilters />
          <ClearCompletedBtn />
        </div>
      </div>
    </div>
  );
}

export default App;
