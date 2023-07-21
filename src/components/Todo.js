import React, { useState } from 'react'

export default function Todo({todo,deleteTodo,updateTodo}) {

  let[ isEdit,setIsEdit] = useState(false);//line-29
  let[title,setTitle]= useState(todo.title);//line-36 value & onChange

  //form တခုနဲ့ဖမ်းချင်လို့ onsubmit ကို use
  let updateTodoHandler = (e)=>{
    e.preventDefault();
    // console.log('update');
    let updatedTodo={
      id : todo.id,//todoရဲ့ မူလ id ကိုပြန်ထည့်ပေးရမယ်
      title,
      complete:todo.complete
    }
    updateTodo(updatedTodo)
    setIsEdit(false);//စာရိုက်လိုက်ရင် input ပိတ်ချင်တာ
  }

  return (
    <div>
      <li className="todo-item-container" >
          <div className="todo-item">
            <input type="checkbox" />

            {/* <span className="todo-item-label line-through"></span> */}
        {/* edit မလုပ်ခဲ့ရင် ပြမယ်*/}
        { !isEdit &&
              <span  onDoubleClick ={()=> setIsEdit(true)}  className={`todo-item-label ${ todo.completed ? "line-through" : "" }`} >
                 {todo.title}
              </span>}
         {/* edit လုပ်ခဲ့ရင် input ကိုပြ   */}
       {isEdit && 
            <form   onSubmit={updateTodoHandler}>
                <input type="text" className="todo-item-input"  value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </form>
        }
          </div>
        
          {/* အမှား button */}
          <button className="x-button"      onClick = {()=> deleteTodo(todo.id)}>
            <svg
              className="x-button-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
    </div>
  )
}

//edit လုပ်ဖို့
//onDoubleClick နှိပ်ရင်ဘာလုပ်သင့်လဲ state တခုကိုဖန်တီးရမှာပါ
// onSubmit={updateTodoHandler}
//value {title } ကိုသိမ်းဖို့ state တခုလို့အပ်တယ် 
// onChange event သုံး 
//form sumbit နဲ့ ဖမ်း  onSubmit={updateTodoHandler}
//app.js ထဲမှာ updatedoto လုပ်
//updatedTodo (main)