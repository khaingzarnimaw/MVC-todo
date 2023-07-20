import React, { useState } from 'react'

export default function TodoForm({addTodo}) {

  //  todo တွေကို add လုပ်ရမယ်
  let[title,setTitle]=useState('')

  let handleSubmit = (e)=> {
    e.preventDefault(); //page referch ကိုရပ််
    // console.log("hit");

    //todo object 
    let todo ={
      id : Math.random(),
      title,
      completed : false
    };
    addTodo(todo)//addTodo
    setTitle('');//clear input

  }

  return (
    <form action="#" onSubmit={handleSubmit}> 
          {/* {title} */}
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            // useState နဲ့ data bind
            onChange ={ e => setTitle(e.target.value)}
            value={title}//tow way data binding
          />
        </form>
  )
}
