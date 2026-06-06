import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.length;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/users/logout", {}, { withCredentials: true });
      dispatch(logout());
      localStorage.removeItem("cartItems");
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-black text-xl text-blue-900 tracking-tight hover:opacity-90 transition-opacity">
            <span>Shopif</span>
            <span className="text-green-600">Y</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
            <Link 
              to="/" 
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                location.pathname === "/" 
                  ? "text-blue-600 bg-blue-50/60" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            <Link 
              to="/products" 
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                location.pathname === "/products" 
                  ? "text-blue-600 bg-blue-50/60" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Products
            </Link>

            {/* Desktop Search - shown only on products page when logged in */}
            {location.pathname === "/products" && user && (
              <form onSubmit={handleSearch} className="relative flex items-center mx-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-48 lg:w-64 pl-10 pr-4 py-1.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-slate-50/50"
                />
                <FiSearch className="absolute left-3.5 text-slate-400" size={16} />
              </form>
            )}

            {/* Cart Icon */}
            {user && (
              <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-950 transition-colors ml-1 mr-2">
                <FiShoppingCart size={22} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: [0.6, 1.25, 1] }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-3 border-l border-slate-100 pl-4 ml-2">
                {user.role === "admin" ? (
                  <Link to="/admin" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
                    {user.name}
                  </Link>
                ) : (
                  <Link to={`/users/${user.id}`} className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
                    {user.name}
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50/50 transition-colors px-3 py-2 rounded-xl cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 border-l border-slate-100 pl-4 ml-2">
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 px-3.5 py-2 rounded-xl">
                  Login
                </Link>
                <Link to="/signup" className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 px-4 py-2 rounded-xl shadow-sm shadow-blue-100 hover:shadow">
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {/* Mobile Cart Icon shortcut */}
            {user && (
              <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-950 transition-colors mr-2">
                <FiShoppingCart size={22} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: [0.6, 1.25, 1] }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors focus:outline-none"
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

      {/* Mobile Menu Dropdown with Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-5 space-y-4">
              
              {/* Search on mobile */}
              {location.pathname === "/products" && user && (
                <form onSubmit={handleSearch} className="pb-1">
                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50/50"
                    />
                    <FiSearch className="absolute left-3.5 text-slate-400" size={16} />
                  </div>
                </form>
              )}

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-semibold ${
                  location.pathname === "/" ? "text-blue-600 bg-blue-50/50" : "text-slate-600"
                }`}
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-semibold ${
                  location.pathname === "/products" ? "text-blue-600 bg-blue-50/50" : "text-slate-600"
                }`}
              >
                Products
              </Link>

              {user && (
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-base font-semibold ${
                    location.pathname === "/cart" ? "text-blue-600 bg-blue-50/50" : "text-slate-600"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FiShoppingCart size={18} />
                    <span>Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              <hr className="border-slate-100 my-2" />

              {user ? (
                <div className="space-y-4 pt-1 px-3">
                  {user.role === "admin" ? (
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="block text-slate-700 font-bold"
                    >
                      Admin Dashboard ({user.name})
                    </Link>
                  ) : (
                    <Link
                      to={`/users/${user.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="block text-slate-700 font-bold"
                    >
                      My Profile ({user.name})
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center bg-red-50 text-red-600 font-semibold py-2.5 rounded-xl border border-red-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2.5 pt-1 px-3">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center text-slate-600 font-semibold py-2 rounded-xl hover:bg-slate-50 border border-slate-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-sm"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

