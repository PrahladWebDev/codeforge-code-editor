import React, { useState } from "react";
import axiosInstance from "../utils/axios";

function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        
        {/* Title */}
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Sign in to your account
        </h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Error Box */}
          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>

            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-white font-semibold transition shadow-md
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"}
            `}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
                     1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
