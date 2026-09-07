import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import AuthModal from "./authModal";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [showAuth, setShowAuth] = useState(false);
    const auth = useAuth();

console.log("AUTH:", auth);

const { isLoggedIn, logout } = auth;
  return (
    <nav className="w-full h-[12vh] flex items-center justify-between px-8 bg-white">
      
      <Link to="/">
        <img
          src={logo}
          alt="Yaseen Realtor"
          className="w-27"
        />
      </Link>

      <div className="flex items-center gap-8">
        <Link to="/" className="text-sm font-medium">
          Home
        </Link>

        <Link to="/property" className="text-sm font-medium">
          Properties
        </Link>

        <Link to="/locations" className="text-sm font-medium">
          Locations
        </Link>
      </div>

      {isLoggedIn ? (
  <button
    onClick={logout}
    className="px-5 py-3 rounded-lg bg-black text-white text-sm"
  >
    Logout
  </button>
) : (
  <button
    onClick={() => setShowAuth(true)}
    className="px-5 py-3 rounded-lg bg-black text-white text-sm"
  >
    Login / Sign Up
  </button>
)}
{showAuth && (
  <AuthModal
    onClose={() => setShowAuth(false)}
    onSuccess={() => setShowAuth(false)}
  />
)}
    </nav>
  );
};

export default Navbar;