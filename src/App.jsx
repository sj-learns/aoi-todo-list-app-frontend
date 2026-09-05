import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import todoImg from './assets/todo_img3_invert.png';
import yujiImg from './assets/Portrait.yujiitadori.png'
import sukunaImg from './assets/Portrait.RyomenSukuna.png'
import yutaImg from './assets/Portrait.yutaokkotsu.png'
import gojoImg from './assets/Portrait.SatoruGojo.png'
import NavBar from './NavBar';
import NavBarh from './NavBarh';

// --- MASCOT LINES (hardcoded per character) ---
const todo_lines = [
  "Do it because you said you would",
  "Don't focus on the guilt of what you couldn't",
  "Are you just gonna sit still?",
  "Don't constrain yourself to conventional thinking",
  "Never stop pushing forward until you find that answer",
  "The proud do not endure...But we will.",
  "What is your type of woman?",
  "This is where growth happens",
  "Do it when you feel like it",
  "No holding back, just do it",
  "Most people think they have what it takes",
  "Greatness isn't given, it's bought"
];

const gojo_lines = [
  "Do it for yourself, No hesitation",
  "Do it for the dream that you refuse to give up on",
  "Nah I'd win",
  "You are entirely responsible for your own growth—own your power and make it work",
  "Even if you stumble at first, keep pushing forward with a smile on your face",
  "Do it for the life you know you deserve.",
  "Those who hesitate, those who live with fear and doubt, will never become great",
  "The world rewards the bold, the relentless",
  "Embrace your ambitions, let them drive you.",
  "Most say they're willing to pay the price for their goals, until they see what it truly costs"
];

const yuji_lines = [
  "Do it when you don't",
  "Do it even when you are exhausted",
  "Do it for the life you know you deserve.",
  "It will break you more than once"
];

const yuta_lines = [
  "Do it for those important to you",
  "Do it because nobody else will",
  "It will take longer than you thought"
];

const sukuna_lines = [
  "The world doesn't care about the meek, it rewards the selfish. To be selfish is to understand your own worth, to prioritize your goals above all else.",
  "You have the potential to be different",
  "You can carve your own path",
  "You have the traits of a winner."
];

// --- MASCOT CHARACTER POOL ---
const mascotCharacters = [
  { name: 'Aoi Todo', img: todoImg, lines: todo_lines },
  { name: 'Satoru Gojo', img: gojoImg, lines: gojo_lines },
  { name: 'Yuji Itadori', img: yujiImg, lines: yuji_lines },
  { name: 'Yuta Okkotsu', img: yutaImg, lines: yuta_lines },
  { name: 'Sukuna', img: sukunaImg, lines: sukuna_lines },
];

const getRandomMascot = () => {
  const character = mascotCharacters[Math.floor(Math.random() * mascotCharacters.length)];
  const line = character.lines[Math.floor(Math.random() * character.lines.length)];
  return { name: character.name, img: character.img, line };
};

const App = () => {
  // --- STATE ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return savedUser?.categories?.length 
      ? ['⚙ General', ...savedUser.categories] 
      : ['⚙ General'];
  });
  const [activeCategory, setActiveCategory] = useState('⚙ General');
  const [newTaskText, setNewTaskText] = useState('');
  // Default mascot before the first randomization kicks in (see effect below)
  const [mascot, setMascot] = useState({ name: 'Aoi Todo', img: todoImg, line: todo_lines[0] });

  const navigate = useNavigate();
  
  const updateCategories = async (newCategories) => {
    setCategories(newCategories); 

    const customCats = newCategories.filter(c => c !== '⚙ General');
    const userData = JSON.parse(localStorage.getItem('user'));
    userData.categories = customCats;
    localStorage.setItem('user', JSON.stringify(userData));

    try {
      await fetch('http://localhost:5000/api/auth/categories', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ categories: customCats })
      });
    } catch (error) {
      console.error("Failed to save categories to database");
    }
  };

  // --- INITIAL FETCH ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return; 
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data); 
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchTasks();
  }, [navigate]);

  // --- RANDOMIZE MASCOT: on first load (post-login) and whenever category changes ---
  useEffect(() => {
    setMascot(getRandomMascot());
  }, [activeCategory]);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  // --- ADD TASK ---
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ 
          text: newTaskText, 
          category: activeCategory 
        })
      });

      if (response.ok) {
        const savedTask = await response.json();
        setTasks([savedTask, ...tasks]); 
        setNewTaskText(""); 
      }
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  // --- TOGGLE TASK ---
  const handleToggleTask = async (taskId, currentStatus) => {
    setTasks(tasks.map(task => 
      task._id === taskId ? { ...task, isDone: !currentStatus } : task
    ));

    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isDone: !currentStatus })
      });
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  // --- DELETE TASK ---
  const handleDeleteTask = async (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));

    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // --- LOGIC ---
  const displayedTasks = activeCategory === '⚙ General' 
  ? tasks 
  : tasks.filter(task => task.category === activeCategory);
  const pendingTasks = displayedTasks.filter(task => !task.isDone).length;

  return (
    <div className="overflow-hidden h-screen bg-gray-950 flex flex-col">
      
      <NavBarh 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        categories={categories}
        updateCategories={updateCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        tasks={tasks}
        setTasks={setTasks}
      />
      
      <NavBar setIsOpen={setIsSidebarOpen} handleLogout={handleLogout}/>
      
      {/* Centered layout wrapper for ALL screens */}
      <section className="bg-fixed relative flex-1 flex flex-col w-full items-center justify-center p-4 sm:p-5 bg-[radial-gradient(circle_at_bottom_left,#0052D4_0%,rgba(0,82,212,0.4)_10%,transparent_25%)]">
        
        {/* UNIVERSAL: Mascot and Horizontal Message Bubble Above Task Board */}
        <div className="flex w-full max-w-[95%] sm:max-w-[500px] lg:max-w-[550px] items-center justify-center gap-3 mb-4 z-[60]">
          <img 
            src={mascot.img} 
            alt={mascot.name} 
            /* Fixed small widths so it stays small on PC as well */
            className="w-[70px] sm:w-[90px] md:w-[100px] h-auto object-contain [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] drop-shadow-[0_0_10px_rgba(0,82,212,0.4)]" 
          />
          <div className="bg-white border-2 border-cyan-500 rounded-lg p-2 sm:p-3 md:p-4 shadow-[0_0_15px_rgba(34,211,238,0.3)] relative flex-1">
            <p className="text-black font-bold text-[11px] sm:text-xs md:text-sm text-center leading-tight">
              {mascot.line}
            </p>
            {/* Horizontal Tail Pointing Left */}
            <div className="absolute top-1/2 -left-[8px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-cyan-500"></div>
            <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-white"></div>
          </div>
        </div>

        {/* UNIVERSAL: Main Task Board */}
        <main className="z-[50] relative bg-white w-full max-w-[95%] sm:max-w-[500px] lg:max-w-[450px] h-[65vh] md:h-[60vh] min-h-[300px] max-h-[700px] rounded-xl p-4 sm:p-5 shadow-2xl flex flex-col transition-all">
          
          {/* Header & Task Counter */}
          <div className="pb-2 text-lg sm:text-2xl font-arial font-bold border-0 border-b-2 border-b-cyan-500 mb-3 flex justify-between items-end">
            <span className="truncate pr-2">{activeCategory}</span>
            <span className="text-xs sm:text-sm text-gray-500 font-normal whitespace-nowrap">{pendingTasks} left</span>
          </div> 
          
          {/* Input & Add Button */}
          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2 mb-3">
            <input 
              type="text" 
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What do you need to do?"
              className="flex-1 border-2 border-gray-200 rounded-md p-2 outline-none focus:border-cyan-500 transition-colors text-xs sm:text-sm"
            />
            <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 sm:py-0 px-4 rounded-md transition-colors text-xs sm:text-sm w-full sm:w-auto">
              Add
            </button>
          </form>

          {/* Task List */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {displayedTasks.length === 0 ? (
              <p className="text-gray-400 text-center mt-10 italic text-xs sm:text-sm">No tasks here yet.</p>
            ) : (
              <ul className="space-y-2">
                {displayedTasks.map(task => (
                  <li key={task._id} className="flex items-center justify-between p-2 sm:p-2.5 bg-gray-50 rounded-lg border border-gray-100 hover:border-cyan-300 transition-colors">
                    <div className="flex items-start sm:items-center gap-2.5 w-full pr-2">
                      <input 
                        type="checkbox" 
                        checked={task.isDone}
                        onChange={() => handleToggleTask(task._id, task.isDone)}
                        className="w-4 h-4 mt-0.5 sm:mt-0 cursor-pointer accent-cyan-500 shrink-0"
                      />
                      <span className={`text-xs sm:text-sm break-words w-full ${task.isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {task.text}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-red-400 hover:text-red-600 font-bold px-1.5 text-xs sm:text-sm shrink-0"
                      aria-label="Delete task"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main> 
      </section>
    </div>
  );
}

export default App;