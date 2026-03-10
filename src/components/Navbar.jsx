import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation()

  const user = useSelector((state) => state.auth.user);
  const login = useSelector((state) => !!state.auth.token);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartCount = cartItems.length;

  const Navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim());
    Navigate(`/products?search=${search}`);


    console.log("Searching for:", search);
  };

  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/users/logout", {}, { withCredentials: true });
      dispatch(logout());
      localStorage.removeItem("cartItems");
      Navigate('/login')
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <nav className="bg-white shadow-md ">
      <div className="max-w-8xl mx-5 px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}

          <div className=" flex font-bold items-center text-blue-800">

            <h2>

              Shopif

             <span className="text-green-700"> Y</span>

            </h2>


          </div>


          {/* Desktop Menu */}


          <div className="hidden md:flex md:items-center md:space-x-4">

            <Link to="/">
              <button className="text-blue-500 hover:to-blue-800">
                Home
              </button>
            </Link>

            <Link to="/products">
              <button className="text-blue-500 hover:to-blue-800">
                Products
              </button>
            </Link>

            {location.pathname === "/products" && user && (

              <form
                onSubmit={handleSearch}
                className="hidden md:flex flex-1 mx-4"
              >

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-80 px-4 py-2 border rounded-l-md"
                />

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 rounded-r-md"
                >

                  Search
                </button>

              </form>

            )}


            {/* Cart Icon */}

            {user && (

              <Link to="/cart" className="relative text-gray-700 hover:text-gray-900">
                <FiShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

            )}


            {user ? (

              <>

                {user.role === "admin" ? (
                  <Link to="/admin" className="text-gray-700 hover:text-gray-900">
                    <button>
                      {user.name}
                    </button>
                  </Link>
                ) : (
                  <Link to={`/users/${user.id}`} className="text-gray-700 hover:text-gray-900">
                    <button>
                      {user.name}
                    </button>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-blue-500 hover:text-blue-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-blue-500 hover:text-blue-800">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="text-blue-500 hover:text-blue-800">
                    Signup
                  </button>
                </Link>
              </>

            )}


          </div>

          {/* Mobile Menu Button */}

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-white px-3 py-4 space-y-3 shadow">

          {/* Search */}

          {location.pathname === "/products" && user && (
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border rounded-l-md"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 rounded-r-md"
              >
                <FiSearch />
              </button>
            </form>
          )}

          {/* Home */}

          <Link
            to="/"
            className="block text-blue-500 hover:text-blue-800"
          >
            <button>
              Home
            </button>
          </Link>

          {/* Products */}

          <Link
            to="/products"
            className="block text-blue-500 hover:text-blue-800"
          >
            <button>
              Products
            </button>
          </Link>

          {/* Cart */}

          {user && (
            <Link
              to="/cart"
              className="flex items-center gap-2 text-gray-700"
            >
              <FiShoppingCart />

              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartCount}
                  Cart
                </span>

              )}
            </Link>
          )}

          {/* User Menu */}

          {user ? (
            <>
              {user.role === "admin" ? (
                <Link to="/admin" className="block text-gray-700">
                  <button>
                    {user.name}
                  </button>
                </Link>
              ) : (
                <Link to={`/users/${user.id}`} className="block text-blue-500 hover:text-blue-800">
                  <button>
                    {user.name}
                  </button>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block">

                <button className="text-blue-500 hover:text-blue-800">
                  Login
                </button>
              </Link>

              <Link to="/signup" className="block">
                <button className="text-blue-500 hover:text-blue-800">
                  Signup
                </button>
              </Link>
            </>
          )}

        </div>
      )}
    </nav >
  );
};

export default Navbar;

