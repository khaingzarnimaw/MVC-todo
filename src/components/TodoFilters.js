import React, { useEffect, useState } from 'react'

//filter state ပြောင်းတိုင်း filtetBy function ကိုခေါ်မှာပါ//App.js မှာရှိ
export default function TodoFilters({filterBy}) {

  let [filter,setFilter]= useState ('All');

  //filterBy functionက javascript function က reference datatype ဖစ်လို့ useEffect ရဲ့ d.arryထဲကိုထည်ရင် infinity loop ကြီးပတ်//
  useEffect(()=>{
    filterBy(filter)
    },[filter,filterBy])

  return (
    <div>
    <button className= {`button filter-button ${filter === 'All' ? 'filter-button-active':''}`} onClick={()=>setFilter('All')} >
      All
    </button>
   <button className={`button filter-button ${filter==='Active' ?'filter-button-active':''}` }onClick={()=> setFilter('Active')}>Active</button>
    <button className={`button filter-button ${filter=== 'setFilter' ? 'filter-button-active':''}`} onClick={()=> setFilter('Completed')}>Completed</button>
  </div>
  )
}
