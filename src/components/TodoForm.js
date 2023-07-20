import React, { useState } from 'react'
//19
export default function TodoForm({addTodo}) {

  //  todo တွေကို add လုပ်ရမယ်//8
  let[title,setTitle] = useState('')

  //12 
  let handleSubmit = (e)=> {
    e.preventDefault(); //page referch ကိုရပ််
    // console.log("hit");

    //todo object //21
    let todo ={
      id : Math.random(),
      title,
      completed : false
    };
    addTodo(todo)//addTodo //13//20//22(todo)
    setTitle('');//clear input//14

  }

  return (
    //onSubmit//11
    <form action="#" onSubmit={handleSubmit}> 
          {/* {title} */}
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            // useState နဲ့ data bind
            onChange ={ e => setTitle(e.target.value)}//9
            value={title}//tow way data binding//10
          />
        </form>
  )
}
