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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Project</h2>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
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
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
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
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Your Projects</h2>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200">
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
                  className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div
                    onClick={() => onSelect(project)}
                    className="flex items-center gap-4 cursor-pointer flex-1"
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
                    className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition"
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
