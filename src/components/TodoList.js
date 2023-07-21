import React from "react";
import Todo from "../components/Todo.js";//<Todo/> component ခေါ်သုံးထား

//4
export default function TodoList({ todos , deleteTodo,updateTodo}) {
  return (
    <ul className="todo-list">
      {/* 5 */}
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      ))}
    </ul>
  );
}
