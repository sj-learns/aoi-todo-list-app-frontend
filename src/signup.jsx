import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from './assets/signup_yuji_and_todo.png'; 
const Signup = () => {
  const [hoverState, setHoverState] = useState('idle');
  const [formData, setFormData] = useState({ name: '',email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Signup failed.');
        return;
      }

      // Redirect to login upon successful registration
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes glowIn {
          0% { filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.5)); }
          33% { filter: drop-shadow(0 0 30px rgba(255, 240, 120, 0.5)); } /* Todo: Whitish-Yellow */
          66% { filter: drop-shadow(0 0 30px rgba(255, 30, 30, 0.5)); }   /* Yuji: Red */
          100% { filter: drop-shadow(0 0 30px rgba(0,82,212,0.4)); } /* Blue/Cyan */
        }
        @keyframes glowOut {
          0% { filter: drop-shadow(0 0 30px rgba(34,211,238,0.6)); }   /* Blue/Cyan */
          33% { filter: drop-shadow(0 0 30px rgba(255, 30, 30, 0.5)); }   /* Yuji: Red */
          66% { filter: drop-shadow(0 0 30px rgba(255, 240, 120, 0.5)); } /* Todo: Whitish-Yellow */
          100% { filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.5)); } /* White */
        }
        .animate-glow-in { animation: glowIn 1.5s ease-in-out forwards; }
        .animate-glow-out { animation: glowOut 1.5s ease-in-out forwards; }
      `}</style>

      {/* min-h-screen and flex-col ensure the page fills the whole monitor */}
      <div className="min-h-screen flex flex-col bg-gray-950 overflow-hidden">

        {/* Header */}
        <header className="relative z-40 text-white border-0 border-b-4 border-b-gray-800 h-24 flex items-center justify-between p-4 px-8 md:px-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">葵 To-Do</h1>
            <h3 className="text-xl md:text-2xl mb-2 ml-[5px] md:ml-[80px] text-cyan-400 [text-shadow:0_0_25px_rgba(34,211,238,0.8)]">
              Keeping it Simple
            </h3>
          </div>

          {/* Login Button (Top Right - Swapped from Sign Up) */}
          <Link 
  to="/login" className="border-2 bg-cyan-500 text-gray-900 hover:border-cyan-500 hover:text-cyan-400 hover:bg-black font-bold py-2 px-6 rounded-md transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]">
            Login
          </Link>
        </header>

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col md:flex-row bg-[radial-gradient(circle_at_bottom_left,#0052D4_0%,rgba(0,82,212,0.4)_10%,transparent_25%)]">

          {/* Left Side: Centered Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center p-8">
            <img
              src={loginImg}
              alt="Yuji and Yuta"
              onMouseEnter={() => setHoverState('hovered')}
              onMouseLeave={() => setHoverState('unhovered')}
              className={`
                w-full max-w-[500px] h-auto object-contain 
                drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] 
                transform transition-transform duration-500 hover:scale-105
                ${hoverState === 'hovered' ? 'animate-glow-in' : ''}
                ${hoverState === 'unhovered' ? 'animate-glow-out' : ''}
              `}
            />
          </div>

          {/* Right Side: Centered Signup Form */}
          <div className="w-full md:w-1/2 flex justify-center items-center p-8">

            <div className="w-full max-w-md bg-black/80 backdrop-blur-md border border-gray-800 p-10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
              {/* Changed Header to match JJK theme for new accounts */}
              <h2 className="text-3xl font-bold text-white mb-8 border-b-2 border-cyan-500 pb-2 inline-block">
                Enroll at&ensp;葵 To-Do
              </h2>

              <form className="flex flex-col gap-5">
                
                {/* New: Email Field added for registration */}
                <div>
                    <label className="block text-gray-400 text-sm font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-cyan-500"
                        placeholder="Yuji Itadori"
                    />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="sorcerer@jjk.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">Choose Username</label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="aoi_todo005"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">
                        {error}
                    </div>
                )}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg py-3 rounded-lg transition-colors mt-2 shadow-lg"
                >
                  Create Account
                </button>
              </form>

              <p className="text-gray-400 text-center mt-8 text-sm">
                Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer hover:underline">Login here</Link>
              </p>
            </div>

          </div>
        </section>

      </div>
    </>
  )
}

export default Signup;