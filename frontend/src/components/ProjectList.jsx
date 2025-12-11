import React, { useState } from 'react';
import axiosInstance from "../utils/axios";

// Import icons from react-icons
import { DiJavascript1, DiPython, DiJava, DiHtml5, DiCss3, DiCpp, DiGo, DiRuby } from 'react-icons/di';
import { FaTrashAlt } from 'react-icons/fa';

function ProjectList({ projects, onSelect, onRefresh }) {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setCreating(true);
    try {
      await axiosInstance.post('/projects', {
        name: name.trim(),
        language,
        code: '// Start coding...\n',
      });
      setName('');
      setLanguage('javascript');
      onRefresh();
    } catch (err) {
      console.error('Error creating project:', err);
      alert('Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axiosInstance.delete(`/projects/${id}`); // Fixed template literal
      onRefresh();
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    }
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: <DiJavascript1 className="text-yellow-400 text-xl" /> },
    { value: 'python', label: 'Python', icon: <DiPython className="text-blue-500 text-xl" /> },
    { value: 'java', label: 'Java', icon: <DiJava className="text-red-600 text-xl" /> },
    { value: 'html', label: 'HTML', icon: <DiHtml5 className="text-orange-600 text-xl" /> },
    { value: 'css', label: 'CSS', icon: <DiCss3 className="text-blue-700 text-xl" /> },
    { value: 'cpp', label: 'C++', icon: <DiCpp className="text-blue-600 text-xl" /> },
    { value: 'go', label: 'Go', icon: <DiGo className="text-cyan-500 text-xl" /> },
    { value: 'ruby', label: 'Ruby', icon: <DiRuby className="text-red-700 text-xl" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Create New Project Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Project</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Project name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value} className="flex items-center gap-2">
                <span className="inline-block mr-2">{lang.icon}</span>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreate}
            disabled={creating || !name.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-2.5 px-6 rounded-lg transition flex items-center justify-center gap-2"
          >
            {creating ? (
              <>Creating...</>
            ) : (
              '+ Create Project'
            )}
          </button>
        </div>
      </div>

      {/* Project List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Projects</h2>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-5xl mb-4">No projects yet</div>
            <p>Create one above to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const lang = languages.find(l => l.value === project.language) || languages[0];

              return (
                <div
                  key={project._id}
                  className="group flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 border border-gray-200 transition cursor-pointer"
                >
                  <div
                    onClick={() => onSelect(project)}
                    className="flex-1 flex items-center gap-4 cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      {lang.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500">
                        {lang.label} • {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(project._id)}
                    className="opacity-0 group-hover:opacity-100 ml-4 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition flex items-center gap-1"
                  >
                    <FaTrashAlt size={12} />
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
