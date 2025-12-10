import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import ProjectList from "./components/ProjectList";
import Editor from "./components/Editor";
import LandingPage from "./components/LandingPage";

import axiosInstance from "./utils/axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
      fetchProjects();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUser({
            username: payload.username || payload.email?.split("@")[0] || "User",
            email: payload.email,
          });
        } catch (e) {
          setUser({ username: "User" });
        }
      }
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowRegister(false);
    setIsSidebarOpen(false);
    fetchUser();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentProject(null);
    setProjects([]);
    setUser(null);
    setIsSidebarOpen(false);
    setIsDropdownOpen(false);
  };

  const getInitials = () => {
    if (!user?.username) return "?";
    return user.username.slice(0, 2).toUpperCase();
  };

  // ---------------------------
  // DASHBOARD LAYOUT COMPONENT
  // ---------------------------
  const DashboardLayout = () => (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-gray-900 shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-white">CodeForge</h1>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 text-sm font-medium text-white hover:text-gray-200"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white ring-opacity-50">
                  {getInitials()}
                </div>
                <span className="hidden md:block capitalize">{user?.username || "User"}</span>

                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-2xl bg-white ring-1 ring-black overflow-hidden z-50">
                  <div className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-xl font-bold">
                        {getInitials()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold capitalize">{user?.username}</p>
                        <p className="text-xs opacity-90">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 flex relative bg-gray-100">
        {/* MOBILE OVERLAY */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`fixed top-16 left-0 bottom-0 w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:z-auto`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Your Projects</h2>

            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <svg className="animate-spin h-10 w-10 text-indigo-600" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                      5.291A7.962 7.962 0 014 12H0c0 3.042 
                      1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            ) : (
              <ProjectList
                projects={projects}
                onSelect={(project) => {
                  setCurrentProject(project);
                  setIsSidebarOpen(false);
                }}
                onRefresh={fetchProjects}
              />
            )}
          </div>
        </aside>

        {/* MAIN EDITOR */}
        <main className="flex-1 bg-white p-4 sm:p-6">
          {currentProject ? (
            <Editor project={currentProject} onRefresh={fetchProjects} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-28 h-28 mx-auto mb-6" />
                <h3 className="text-2xl font-medium text-gray-700 mb-2">Select a project to start editing</h3>
                <p className="text-gray-500">Tap the menu to see your projects</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );

  // ---------------------------
  // LOGIN PAGE COMPONENT
  // ---------------------------
  const LoginPage = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-2">CodeForge</h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          {showRegister ? "Create a new account" : "Sign in to your account"}
        </p>

        <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
          {showRegister ? <Register onSuccess={handleLogin} /> : <Login onSuccess={handleLogin} />}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowRegister(!showRegister)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {showRegister ? "Already have an account? Sign in" : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ---------------------------
  // MAIN ROUTER
  // ---------------------------
  return (
    <Router>
      <Routes>
        {/* Landing page always visible */}
        <Route path="/" element={<LandingPage />} />

        {/* login page */}
        <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/app" />} />

        {/* dashboard only if logged in */}
        <Route path="/app" element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
