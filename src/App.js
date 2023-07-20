import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import { useEffect, useState } from "react";

function App() {
  //2
  let [todos, setTodos] = useState([]);

  //1
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        // console.log("hit");
      }, []);
  }, []);

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

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        {/* 18 */}
        <TodoForm  addTodo={addTodo}/> 

        {/* 3 */}
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
