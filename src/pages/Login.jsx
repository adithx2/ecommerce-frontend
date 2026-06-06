import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/usersApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";


const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({ email: "", password: "" })

  const handleChange = (event) => {

    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    try {

      const response = await loginUser(data)

      console.log(response)

      dispatch(

        setUser({

          user: response.user,
          token: response.token
        })

      )

      toast.success('Login successfull')

      if (response.user.role === "admin") {
        navigate("/admin"); // admin dashboard
      } else {

        navigate(`/users/${response.user.id}`); // normal user account

      }


    } catch (error) {

      console.log(error, "Login failed")
      toast.error('Login Failed')

    }

  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/50 p-4 sm:p-6 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden border border-slate-100"
      >
        {/* Left Side - Welcome Banner */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-500 text-white flex flex-col justify-center items-center p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Decorative shapes for premium feel */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-12 translate-y-12"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Welcome Back</h1>
            <p className="text-blue-100 max-w-xs text-sm sm:text-base leading-relaxed mx-auto">
              Login to continue shopping your favourite products
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-slate-800 text-center md:text-left">
            Login
          </h2>
          <p className="text-slate-500 text-sm text-center md:text-left mb-6">
            Please enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                onChange={handleChange}
                className="w-full border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-slate-50/50"
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
                className="w-full border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-slate-50/50"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold p-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer mt-6"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center md:text-left mt-6 text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>

      </motion.div>

    </div>
  );
};



export default Login;