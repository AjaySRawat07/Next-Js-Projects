"use client"

import { useState } from "react";


interface TodoItem {
    id : string,
    text : string
}

export default function Home() {
  const[value, setValue] = useState<string>("");
  const[item, setItem] = useState<TodoItem[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const addTodo = () =>{
    if(value.trim() === ""){
      return;
    }

    if(editId){
       setItem(prev => prev.map(todo => todo.id === editId ? {...todo, text: value } : todo))
       setEditId(null)
    }
    else{
      const newTodo : TodoItem = {
        id : crypto.randomUUID(),
        text : value
     }
 
     setItem(prev => [...prev, newTodo])
    }
    setValue("");
  }

  const editItem = (i: TodoItem) =>{
      setValue(i.text);
      setEditId(i.id);
  }

  const deleteItem = (id: string) =>{
      setItem(prev => prev.filter(todo => todo.id !== id) );
      if(editId == id){
        setEditId(null);
        setValue("")
      }
  }

  return (
    <div>
        <div>
            <input type="text" className="border border-black py-2 px-2 mx-2 rounded-md" value={value} onChange={(e) => setValue(e.target.value)} />
            <button className="border border-black py-2 px-2 rounded-md" onClick={addTodo}>Add</button>
        </div>
        <div>{...item.map((i) => {
          return(
            <div key={i.id} className="border border-black py-2 px-2 mx-2 rounded-md my-2">{i.text} 
              <div className="flex justify-end">
              <span className="border border-black py-2 px-2 mx-2 rounded-md" onClick={() => editItem(i)}>E</span>
              <span className="border border-black py-2 px-2 mx-2 rounded-md" onClick={() => deleteItem(i.id)}>X</span>
              </div>
            </div>
          )
        })}</div>
    </div>
  );
}
