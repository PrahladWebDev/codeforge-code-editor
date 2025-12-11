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
    { value: 'go', label: 'Go', icon: 'GO' },
    { value: 'ruby', label: 'Ruby', icon: 'RB' },
  ];

  return (
    <>
      {/* Create New Project Form */}
      <div>
        <h2>Create New Project</h2>
        <input
          type="text"
          placeholder="Project name"
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
            <option key={lang.value}>
              {lang.icon} {lang.label}
            </option>
          ))}
        </select>
        <button onClick={handleCreate}>
          {creating ? 'Creating...' : '+ Create Project'}
        </button>
      </div>

      {/* Project List */}
      <div>
        <h2>Your Projects</h2>
        {projects.length === 0 ? (
          <div>
            <p>No projects yet</p>
            <p>Create one above to get started!</p>
          </div>
        ) : (
          <div>
            {projects.map((project) => {
              const lang = languages.find(l => l.value === project.language) || languages[0];

              return (
                <div key={project._id} className="group">
                  <div onClick={() => onSelect(project)} className="flex-1 cursor-pointer">
                    <span>{lang.icon}</span>
                    <h3>{project.name}</h3>
                    <p>
                      {lang.label} • {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
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
