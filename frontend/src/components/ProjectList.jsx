import React, { useState } from "react";
import axiosInstance from "../utils/axios";

import {
  DiJavascript1,
  DiPython,
  DiJava,
  DiHtml5,
  DiCss3,
  DiGo,
  DiRuby,
} from "react-icons/di";
import { SiCplusplus as DiCpp } from "react-icons/si";
import { FaTrashAlt } from "react-icons/fa";

function ProjectList({ projects, onSelect, onRefresh }) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [creating, setCreating] = useState(false);

  // CREATE PROJECT
  const handleCreate = async () => {
    if (!name.trim()) return;
    setCreating(true);

    try {
      await axiosInstance.post("/projects", {
        name: name.trim(),
        language,
        code: "// Start coding...\n",
      });

      setName("");
      setLanguage("javascript");
      onRefresh();
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  // DELETE PROJECT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`/projects/${id}`);
      onRefresh();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete project");
    }
  };

  // Supported languages
  const languages = [
    { value: "javascript", label: "JavaScript", icon: <DiJavascript1 className="text-yellow-500 text-3xl" /> },
    { value: "python", label: "Python", icon: <DiPython className="text-blue-500 text-3xl" /> },
    { value: "java", label: "Java", icon: <DiJava className="text-red-600 text-3xl" /> },
    { value: "html", label: "HTML", icon: <DiHtml5 className="text-orange-600 text-3xl" /> },
    { value: "css", label: "CSS", icon: <DiCss3 className="text-blue-600 text-3xl" /> },
    { value: "cpp", label: "C++", icon: <DiCpp className="text-blue-400 text-3xl" /> },
    { value: "go", label: "Go", icon: <DiGo className="text-cyan-500 text-3xl" /> },
    { value: "ruby", label: "Ruby", icon: <DiRuby className="text-red-700 text-3xl" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      {/* --- CREATE PROJECT BOX --- */}
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Create New Project
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Project Name Input */}
          <input
            type="text"
            placeholder="Project name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />

          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer"
          >
            {languages.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            disabled={creating || !name.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            {creating ? "Creating..." : "+ Create Project"}
          </button>
        </div>

        {/* Selected Language UI */}
        <div className="mt-4 flex items-center space-x-3 text-sm text-gray-700">
          <span className="font-medium">Selected:</span>
          {languages.find((l) => l.value === language)?.icon}
          <span>{languages.find((l) => l.value === language)?.label}</span>
        </div>
      </div>

      {/* --- PROJECT LIST --- */}
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Your Projects
        </h2>

        {projects.length === 0 ? (
          <div className="text-center py-14 text-gray-500">
            <div className="text-5xl mb-4">📁</div>
            <p className="text-lg">No projects yet. Create one above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => {
              const lang = languages.find((l) => l.value === project.language);

              return (
                <div
                  key={project._id}
                  onClick={() => onSelect(project)}
                  className="
                    group flex items-center justify-between
                    border border-gray-200 bg-gray-50 hover:bg-gray-100
                    p-5 rounded-lg cursor-pointer transition
                  "
                >
                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {lang?.icon}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {project.name}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {lang?.label} • Last updated{" "}
                        {new Date(project.updatedAt).toLocaleDateString()}{" "}
                        {new Date(project.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(project._id);
                    }}
                    className="
                      opacity-0 group-hover:opacity-100
                      flex items-center gap-2
                      px-4 py-2 bg-red-100 text-red-600
                      rounded-lg hover:bg-red-200 transition
                    "
                  >
                    <FaTrashAlt size={14} />
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectList;
