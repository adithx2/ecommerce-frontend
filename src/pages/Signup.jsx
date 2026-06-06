import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../services/usersApi";
import { motion } from "framer-motion";

const Signup = () => {

  const navigate = useNavigate()

  const [data, setData] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (event) => {

    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {

    event.preventDefault()
    setError("")

    try {

      await createUser(data)

      navigate('/login')

    } catch (error) {

      setError(error.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/50 p-4 sm:p-6 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden border border-slate-100"
      >
        {/* Left Side - Welcome Banner */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-500 text-white flex flex-col justify-center items-center p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Decorative shapes for premium feel */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl transform -translate-x-12 translate-y-12"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Create Account</h1>
            <p className="text-emerald-100 max-w-xs text-sm sm:text-base leading-relaxed mx-auto">
              Join us and start shopping today
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-800 text-center md:text-left">
            Signup
          </h2>
          <p className="text-slate-500 text-sm text-center md:text-left mb-6">
            Create your account to start managing and shopping products
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                className="w-full border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-slate-50/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
                className="w-full border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-slate-50/50"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-slate-50/50"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold p-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer mt-6"
            >
              Signup
            </motion.button>
          </form>

          <p className="text-center md:text-left mt-6 text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};



export default Signup