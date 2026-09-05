import React from 'react';
import side_navigationBar from "./assets/side_navigationBar.svg";

const NavBar = ({ setIsOpen, handleLogout }) => {
  return (
    <div className="relative z-40 text-white text-center border-0 border-b-4 border-b-gray-800 h-16 md:h-20 flex items-center justify-between p-3 md:px-6 md:py-3 transition-all duration-300">
        <button onClick={() => setIsOpen(true)} className="cursor-pointer hover:opacity-80 transition-opacity">
          <img src={side_navigationBar} alt="Menu Bar" className="w-6 h-6 md:w-8 md:h-8"/>
        </button>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mt-1">葵 To-Do</h1>
          <h3 className="text-xs md:text-xl mb-1 text-cyan-400 [text-shadow:0_0_10px_rgba(34,211,238,0.8)] md:[text-shadow:0_0_20px_rgba(34,211,238,0.8)]">
            Keeping it Simple
          </h3>
        </div>
        <button 
          onClick={handleLogout}
          className="border-2 bg-cyan-500 text-gray-900 hover:border-cyan-500 hover:text-cyan-400 hover:bg-black font-bold py-1 px-3 md:py-2 md:px-5 text-xs md:text-sm rounded-md transition-all shadow-[0_0_10px_rgba(34,211,238,0.3)] md:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
        >
          Logout
        </button>
    </div>
  )
}

export default NavBar;