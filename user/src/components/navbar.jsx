import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import AuthModal from "./authModal";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { isLoggedIn, logout } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  const getInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }

    return "U";
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    setShowProfile(false);
    setShowMenu(false);
  };

  return (
    <nav className="relative w-full bg-white">

      {/* Main Navbar */}
      <div className="h-[12vh] min-h-[70px] flex items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Logo */}
        <Link to="/" onClick={() => setShowMenu(false)}>
          <img
            src={logo}
            alt="Yaseen Realtor"
            className="w-24 sm:w-27"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-gray-800 hover:text-gray-500"
          >
            Home
          </Link>

          <Link
            to="/property"
            className="text-sm font-medium text-gray-800 hover:text-gray-500"
          >
            Properties
          </Link>
        </div>

        {/* Desktop Authentication */}
        <div className="hidden md:block">

          {isLoggedIn ? (
            <div className="relative">

              <button
                onClick={() => setShowProfile(!showProfile)}
                className="w-11 h-11 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold"
              >
                {getInitial()}
              </button>

              {showProfile && (
                <div className="absolute right-0 top-14 z-40 w-72 rounded-xl bg-white border border-gray-200 shadow-xl p-5">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                      {getInitial()}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {user?.name || "User"}
                      </h3>

                      <p className="text-sm text-gray-500 truncate">
                        {user?.email || ""}
                      </p>
                    </div>

                  </div>

                  <div className="border-t border-gray-200 mt-5 pt-4">

                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>

                  </div>

                </div>
              )}

            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="px-5 py-3 rounded-lg bg-gray-900 text-white text-sm"
            >
              Login / Sign Up
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-gray-900"></span>
          <span className="block w-6 h-0.5 bg-gray-900"></span>
          <span className="block w-6 h-0.5 bg-gray-900"></span>
        </button>

      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden border-t border-gray-200 bg-white px-5 py-5">

          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={() => setShowMenu(false)}
              className="text-sm font-medium"
            >
              Home
            </Link>

            <Link
              to="/property"
              onClick={() => setShowMenu(false)}
              className="text-sm font-medium"
            >
              Properties
            </Link>

            {isLoggedIn ? (
              <>
                <div className="border-t border-gray-200 pt-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                      {getInitial()}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold truncate">
                        {user?.name || "User"}
                      </p>

                      <p className="text-sm text-gray-500 truncate">
                        {user?.email || ""}
                      </p>
                    </div>

                  </div>

                </div>

                <button
                  onClick={() => {
                    setShowLogoutConfirm(true);
                    setShowMenu(false);
                  }}
                  className="w-full text-left py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowAuth(true);
                  setShowMenu(false);
                }}
                className="w-full py-3 rounded-lg bg-gray-900 text-white text-sm"
              >
                Login / Sign Up
              </button>
            )}

          </div>

        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => setShowAuth(false)}
        />
      )}

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-xl">

            <h2 className="text-xl font-bold text-gray-900">
              Logout?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to logout from your account?
            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-lg border border-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-lg bg-gray-900 text-white"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;