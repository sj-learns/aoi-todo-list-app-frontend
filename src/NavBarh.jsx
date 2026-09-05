import React from 'react';
import side_navigationBar from "./assets/side_navigationBar.svg";

const NavBarh = ({ isOpen, setIsOpen, categories, updateCategories, activeCategory, setActiveCategory, tasks, setTasks }) => {
  // 1. Get the user data from localStorage (or set defaults if empty)
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const displayName = userData.name || "Sorcerer";
  
  // 2. Get the first letter for the circle avatar
  const initial = displayName.charAt(0).toUpperCase();
  
  const handleAddCategory = () => {
    const newCat = window.prompt("Enter new category name:");
    if (newCat && newCat.trim() !== "" && !categories.includes(newCat.trim())) {
      updateCategories([...categories, newCat.trim()]);
    }
  };

  const handleDeleteCategory = (catToDelete, e) => {
  e.stopPropagation(); // Prevents switching to the category when clicking 'X'
  
  if (catToDelete === '⚙ General') return; // Protect default category

  // 1. Ask for confirmation
  const isConfirmed = window.confirm(
    `Are you sure you want to delete the category "${catToDelete}"? All tasks inside it will be permanently deleted!`
  );

  // 2. If user clicks "Cancel", stop right here!
  if (!isConfirmed) return;

  // 3. Otherwise, proceed with deletion
  updateCategories(categories.filter(c => c !== catToDelete));
  if (activeCategory === catToDelete) {
    setActiveCategory('⚙ General');
  }
  setTasks(tasks.filter(t => t.category !== catToDelete));
};
  return (
    <div className={`text-white border-0 border-r-2 border-r-cyan-500 fixed z-[99] top-0 h-[100vh] w-[280px] bg-black/95 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 ${
        isOpen ? 'left-0' : 'left-[-280px]'
      }`}>
      
      {/* 1. YOUR ORIGINAL HEADER */}
      <div className="flex justify-between p-4 border-b-2 border-b-gray-800">
        <div>
          <h1 className="text-3xl font-bold mt-2">葵 To-Do</h1>
          <h3 className="text-xl mb-2 text-cyan-400 [text-shadow:0_0_15px_rgba(34,211,238,0.8)]">Keeping it Simple</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="cursor-pointer hover:opacity-80 mt-2">
          <img src={side_navigationBar} alt="Close Menu" className="w-8 h-8 filter invert" />
        </button>
      </div>

      {/* 2. USER PROFILE PLACEHOLDER */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-800 bg-gray-900/50">
        {/* Placeholder DP - You can replace the src with user's actual image later */}
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500 bg-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
            <span className="font-bold text-xl text-cyan-400">{initial}</span> 
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Welcome back,</span>
          <span className="font-bold text-lg leading-tight truncate w-32">{displayName}</span>
        </div>
      </div>

      {/* 3. CATEGORIES SECTION */}
      <div className="p-4 flex flex-col gap-2">
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Categories</h4>
        
        {categories.map(category => {
          const taskCount =category==="⚙ General" ? tasks.length: tasks.filter(t => t.category === category).length;
          const isActive = activeCategory === category;

          return (
            <div 
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setIsOpen(false);
              }}
              className={`flex justify-between items-center cursor-pointer p-2 rounded-md transition-colors ${
                isActive ? 'bg-cyan-900/40 border-l-4 border-cyan-500' : 'hover:bg-gray-800 border-l-4 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-semibold ${isActive ? 'text-cyan-400' : 'text-gray-300'}`}>
                  {category}
                </span>
                <span className="bg-gray-800 text-gray-400 text-xs py-0.5 px-2 rounded-full">
                  {taskCount}
                </span>
              </div>
              
              {category !== '⚙ General' && (
                <button 
                  onClick={(e) => handleDeleteCategory(category, e)}
                  className="text-gray-600 hover:text-red-500 font-bold px-2"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
        
        <button 
          onClick={handleAddCategory}
          className="mt-2 text-left text-sm text-cyan-500 hover:text-cyan-400 font-semibold p-2 transition-colors"
        >
          + Create New Category
        </button>
      </div>
    </div>
  )
}

export default NavBarh;