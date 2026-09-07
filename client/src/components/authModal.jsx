import React, { useState } from "react";
import { useAuth } from "../context/authContext";

const AuthModal = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
    const { login } = useAuth();
  const handleSubmit = (e) => {
  e.preventDefault();

  login();
  onSuccess();
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-2xl text-gray-500"
        >
          ×
        </button>

        <div className="text-center">

          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="mt-2 text-gray-500">
            {isLogin
              ? "Login to view property details"
              : "Sign up to explore property details"}
          </p>

        </div>


        <form onSubmit={handleSubmit} className="mt-8">

          {!isLogin && (
            <div className="mb-5">

              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />

            </div>
          )}


          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
            />

          </div>


          <div className="mb-6">

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
            />

          </div>


          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 py-3 text-white"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

        </form>


        <div className="mt-6 text-center text-sm text-gray-500">

          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 font-semibold text-gray-900"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AuthModal;