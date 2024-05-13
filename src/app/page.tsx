'use client'

import { useState } from "react";
import { TodoObject } from "../app/model/todo"
import { v4 as uuid } from "uuid"


const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoObject[]>([])
  
  const addTodo = () => {
    if (todo.trim() !== '') {
      setTodos([{ id: uuid(), value: todo, done: false }, ...todos]);
      setTodo("");
    }
  }

  const markTodoDone = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const clearAllTodos = () => {
    setTodos([]);
  }

  return (
    <div className="bg-sky-300 w-screen h-screen ">
      <header className="bg-slate-700 p-4">
        <h1 className="text-3xl text-white text-center italic">ToDo List</h1>
      </header>
      <main className="p-4">
        <input type="text" placeholder="Enter Your ToDo-List" className="p-2 rounded mr-5 text-slate-900" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button className="border-2 p-2 rounded hover:bg-slate-700 hover:text-white " onClick={() => addTodo()}>Add ToDo</button>
        <button className="border-2 p-2 rounded ml-3 hover:bg-slate-700 hover:text-white" onClick={() => clearAllTodos()}>Clear All Todos</button>
        <ul className="mt-7 ">
          {
            todos.map(todo => (
              <li key={todo.id} onClick={() => markTodoDone(todo.id)} className={`text-3xl ml-5 cursor-pointer truncate ${todo.done ? 'line-through' : 'no-underline'}`}>
                <span>{todo.value}</span>
                <button className="ml-3 text-red-500 bg-white rounded-full w-[40px] h-[40px] border-2 border-rose-600 hover:bg-red-500 hover:text-white duration-500" onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>x</button>
              </li>
            ))
          }
        </ul>
      </main>
    </div>
  );
}

export default Home;
