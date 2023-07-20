import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import { useEffect,useState } from "react";

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


  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm />
        <TodoList todos={todos}/>
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
