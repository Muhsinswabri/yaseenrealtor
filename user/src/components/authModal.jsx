import React, { useState } from "react";
import { useAuth } from "../context/authContext";

const AuthModal = ({ onClose, onSuccess }) => {
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? `${import.meta.env.VITE_API_URL}/api/users/login`
        : `${import.meta.env.VITE_API_URL}/api/users/register`

      const body = isLogin
        ? {
            email,
            password,
          }
        : {
            name,
            email,
            password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        login();
        onSuccess();
      } else {
        setName("");
        setEmail("");
        setPassword("");
        setShowPassword(false);

        setIsLogin(true);
        setError(
          "Account created successfully. Please login."
        );
      }
    } catch (error) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">

      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-8 shadow-xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 sm:right-5 top-3 sm:top-4 text-2xl text-gray-500 hover:text-gray-900"
        >
          ×
        </button>

        {/* Heading */}
        <div className="text-center pt-2">

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {isLogin
              ? "Login to view property details"
              : "Sign up to explore property details"}
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 sm:mt-8"
        >

          {/* Name */}
          {!isLogin && (
            <div className="mb-4 sm:mb-5">

              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900"
              />

            </div>
          )}

          {/* Email */}
          <div className="mb-4 sm:mb-5">

            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-gray-900"
            />

          </div>

          {/* Password */}
          <div className="mb-5 sm:mb-6">

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm sm:text-base outline-none focus:border-gray-900"
              />

              {/* Eye Button */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-900"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  /* Eye Off */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.928 0 1.833-.12 2.69-.343M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.066 7.5a10.523 10.523 0 01-4.293 5.146M6.228 6.228L3 3m3.228 3.228l3.65 3.65m0 0a3 3 0 104.243 4.243m-4.243-4.243l4.243 4.243m0 0L21 21"
                    />
                  </svg>
                ) : (
                  /* Eye */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.178.07.21.07.434 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.178z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>

            </div>

          </div>

          {/* Error */}
          {error && (
            <p
              className={`mb-5 text-sm ${
                error.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 py-3 text-sm sm:text-base text-white hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating Account..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>

        </form>

        {/* Switch Login / Signup */}
        <div className="mt-5 sm:mt-6 text-center text-sm text-gray-500">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setShowPassword(false);
            }}
            className="ml-2 font-semibold text-gray-900 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AuthModal;