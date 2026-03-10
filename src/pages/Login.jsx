import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/usersApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { toast } from "react-toastify";


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

  <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="bg-white shadow-xl rounded-2xl flex w-212.5 overflow-hidden">

      {/* Left Side */}


      <div className="w-1/2 bg-blue-400 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
        <p className="text-center">
          Login to continue shopping your favourite products
        </p>
      </div>

      {/* Right Side */}
      <div className="w-1/2 p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="p-2">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-4 my-2 rounded-lg focus:outline-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg focus:outline-blue-500"
          />

          <button
            className="w-full bg-blue-500 text-white p-4 my-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?
          <a href="/signup" className="text-blue-500 ml-1">
            Signup
          </a>
        </p>

      </div>

    </div>

  </div>
);
};



export default Login;