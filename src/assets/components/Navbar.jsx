import React from 'react'
import { FcTodoList } from "react-icons/fc";

function Navbar() {
  return (
    //Todo-list navbar
    <nav className="bg-gray-800 p-4 min-w-[330px]">
      <div className="container mx-auto flex justify-between items-center flex-col sm:flex-row">
        <div className='flex items-center space-x-2'>
        < FcTodoList size={100} className='sm:w-[80px] sm:h-[80px]'    />
        <div className="text-white text-6xl sm:text-4xl p-4 font-bold">Todo List</div>
        </div>
        <div className="text-white text-xl font-semibold">
          <span className="text-blue-500">Organize</span> your tasks
          </div>
      </div>
    </nav>
  )
}

export default Navbar