import React, { useState } from 'react';
import axiosInstance from "../utils/axios";

function ProjectList({ projects, onSelect, onRefresh }) {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;

    setCreating(true);
    try {import React, { useState } from 'react';
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
      await axiosInstance.delete(`/projects/${id}`); // ← fixed template literal
      onRefresh();
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    }
  };

  // Language list with proper visible icons inside <option>
  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: 'JS' },
    { value: 'python',     label: 'Python',     icon: 'PY' },
    { value: 'java',       label: 'Java',       icon: 'JV' },
    { value: 'html',       label: 'HTML',       icon: 'HTML' },
    { value: 'css',        label: 'CSS',        icon: 'CSS' },
    { value: 'cpp',        label: 'C++',        icon: 'C++' },
    { value: 'go',         label: 'Go',         icon: 'GO' },
    { value: 'ruby',       label: 'Ruby',       icon: 'RB' },
  ];

  return (
    <>
      {/* Create New Project Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb- mb-4">Create New Project</h2>

        <div className="flex flex-col sm:flex-row gap-4">
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
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-pointer"
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
            className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap"
          >
            {creating ? 'Creating...' : '+ Create Project'}
          </button>
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Projects</h2>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl mb-2">No projects yet</p>
            <p>Create one above to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const lang = languages.find((l) => l.value === project.language) || languages[0];

              return (
                <div
                  key={project._id}
                  className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div
                    onClick={() => onSelect(project)}
                    className="flex-1 flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-bold text-gray-700">
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
    </>
  );
}

export default ProjectList;
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
    { value: 'go', label: 'Go', icon: 'GO' },
    { value: 'ruby', label: 'Ruby', icon: 'RB' },
  ];

  return (
    <div className="space-y-6">
      {/* Create New Project Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Project</h3>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="My Awesome Project"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.icon} {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreate}
            disabled={!name.trim() || creating}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition ${
              name.trim() && !creating
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {creating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Creating...
              </span>
            ) : (
              '+ Create Project'
            )}
          </button>
        </div>
      </div>

      {/* Project List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Projects</h3>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mx-auto mb-4" />
            <p>No projects yet</p>
            <p className="text-sm mt-1">Create one above to get started!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {projects.map((project) => {
              const lang = languages.find(l => l.value === project.language) || languages[0];
              
              return (
                <div
                  key={project._id}
                  className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-indigo-300 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => onSelect(project)}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow">
                          {lang.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 hover:text-indigo-600 transition">
                            {project.name}
                          </h4>
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
