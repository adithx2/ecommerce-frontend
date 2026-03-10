import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/usersApi";

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

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl flex w-212.5 overflow-hidden">

        {/* Left Side */}
        <div className="w-1/2 bg-green-500 text-white flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold mb-4">Create Account</h1>
          <p className="text-center">
            Join us and start shopping today
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-8">

          <h2 className="text-2xl font-bold text-center">
            Signup
          </h2>

          <form onSubmit={handleSubmit} className="p-2">

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full border p-3 my-2 rounded-lg focus:outline-green-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border p-3 my-2 rounded-lg focus:outline-green-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border p-3 my-2 rounded-lg focus:outline-green-500"
            />

            <button
              className="w-full bg-green-500 text-white p-4 rounded hover:bg-green-600"
            >
              Signup
            </button>

          </form>

          <p className="text-center mt-4">
            Already have an account?
            <a href="/login" className="text-green-500 ml-1">
              Login
            </a>
          </p>

        </div>

      </div>

    </div>
  );
};



export default Signup