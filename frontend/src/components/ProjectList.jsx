import React, { useState } from 'react';
import axiosInstance from "../utils/axios";

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
      await axiosInstance.delete(`/projects/${id}`);
      onRefresh();
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    }
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: 'JS' },
    { value: 'python', label: 'Python', icon: 'PY' },
    { value: 'java', label: 'Java', icon: 'JV' },
    { value: 'html', label: 'HTML', icon: 'HTML' },
    { value: 'css', label: 'CSS', icon: 'CSS' },
    { value: 'cpp', label: 'C++', icon: 'C++' },
    { value: 'go', label: 'Go', icon: 'GO'GO' },
    { value: 'ruby', label: 'Ruby', icon: 'RB' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Create New Project Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-48 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.icon} {lang.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleCreate}
            disabled={creating || !name.trim()}
            className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {creating ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating...
              </>
            ) : (
              '+ Create Project'
            )}
          </button>
        </div>
      </div>

      {/* Project List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">No projects yet</p>
            <p className="text-gray-400 mt-2">Create one above to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const lang = languages.find(l => l.value === project.language) || languages[0];

              return (
                <div
                  key={project._id}
                  className="group bg-white border border-gray-200 rounded-lg p-4 flex items-center hover:shadow-md transition"
                >
                  <div
                    onClick={() => onSelect(project)}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-700">{lang.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-sm text-gray-500">
                          {lang.label} • {new Date(project.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="opacity-0 group-hover:opacity-100 ml-4 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition"
                  >
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
