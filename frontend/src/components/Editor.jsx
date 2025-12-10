import React, { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import axiosInstance from "../utils/axios";

import { Save, Play } from "lucide-react";

// Themes + core modes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';

// -----------------------------
// Dynamic mode loader (fixed)
// -----------------------------
const loadMode = async (lang) => {
  try {
    switch (lang) {
      case 'java':
        await import('ace-builds/src-noconflict/mode-java');
        break;

      case 'cpp':
      case 'c':
        await import('ace-builds/src-noconflict/mode-c_cpp');
        break;

      case 'go':
      case 'golang':
        await import('ace-builds/src-noconflict/mode-golang');
        break;

      case 'ruby':
        await import('ace-builds/src-noconflict/mode-ruby');
        break;

      default:
        break;
    }
  } catch (err) {
    console.error("Failed loading Ace mode:", lang, err);
  }
};

function Editor({ project, onRefresh }) {
  const [code, setCode] = useState(project.code || '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const iframeRef = useRef(null);

  // -----------------------------
  // Sync editor when project changes
  // -----------------------------
  useEffect(() => {
    setCode(project.code || '');
    setIsSaved(true);
    setOutput('');
    setError('');

    const normalized =
      project.language === 'go' ? 'golang' : project.language;
    loadMode(normalized);

  }, [project._id, project.language, project.code]);

  // -----------------------------
  // Auto-save after 3s inactivity
  // -----------------------------
  useEffect(() => {
    if (code === project.code) {
      setIsSaved(true);
      return;
    }

    setIsSaved(false);

    const timer = setTimeout(() => {
      handleSave();
    }, 3000);

    return () => clearTimeout(timer);
  }, [code, project.code]);

  // -----------------------------
  // Manual Save
  // -----------------------------
  const handleSave = async () => {
    if (saving || code === project.code) return;

    setSaving(true);
    try {
      await axiosInstance.put(`/projects/${project._id}`, { code });

      setIsSaved(true);
      onRefresh();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save code.');
      setIsSaved(false);
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------
  // Run Code Handler
  // -----------------------------
  const handleRun = async () => {
    setRunning(true);
    setOutput('');
    setError('');

    try {
      if (project.language === 'javascript') {
        const logs = [];
        const originalLog = console.log;

        console.log = (...args) =>
          logs.push(args.map(a => String(a)).join(' '));

        try {
          new Function(code)();
          setOutput(logs.length ? logs.join('\n') : 'No output (use console.log)');
        } catch (err) {
          setError(err.message || err.toString());
        } finally {
          console.log = originalLog;
        }
      }

      else if (project.language === 'html') {
        if (iframeRef.current) iframeRef.current.srcdoc = code;
        setOutput('Preview updated');
      }

      else if (project.language === 'css') {
        setOutput('CSS cannot run alone. Embed inside HTML.');
      }

      else {
        const res = await axiosInstance.post('/execute', {
          code,
          language: project.language
        });

        setOutput(res.data.output || '');
        if (res.data.error) setError(res.data.error);
      }

    } catch (err) {
      setError(err.response?.data?.error || 'Execution failed');
    } finally {
      setRunning(false);
    }
  };

  // -----------------------------
  // Language Label
  // -----------------------------
  const languageLabel = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java',
    html: 'HTML',
    css: 'CSS',
    cpp: 'C++',
    go: 'Go',
    ruby: 'Ruby'
  }[project.language] || project.language.toUpperCase();

  // -----------------------------
  // Ace Mode Mapping
  // -----------------------------
  const aceMode =
    project.language === 'cpp'
      ? 'c_cpp'
      : project.language === 'go'
      ? 'golang'
      : project.language;

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm font-medium">
            {languageLabel}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span
            className={`text-sm font-medium ${
              isSaved ? 'text-green-400' : 'text-yellow-400'
            }`}
          >
            {saving ? 'Saving...' : isSaved ? 'Saved' : 'Unsaved changes'}
          </span>

          {/* SAVE ICON BUTTON */}
          <button
            onClick={handleSave}
            disabled={saving || isSaved}
            className={`p-2 rounded-lg transition ${
              saving || isSaved
                ? 'bg-gray-700 opacity-50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Save
              size={22}
              className={`${saving ? 'animate-pulse' : ''}`}
            />
          </button>

          {/* RUN ICON BUTTON */}
          <button
            onClick={handleRun}
            disabled={running}
            className={`p-2 rounded-lg transition ${
              running ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Play
              size={22}
              className={`${running ? 'animate-spin-slow' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Editor + Output */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Code Editor */}
        <div className="flex-1">
          <AceEditor
            mode={aceMode}
            theme="monokai"
            value={code}
            onChange={setCode}
            name="code-editor"
            width="100%"
            height="100%"
            fontSize={16}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="w-full lg:w-96 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-300 flex flex-col">
          <div className="bg-gray-800 text-white px-5 py-3 font-medium">
            {project.language === 'html' ? 'Live Preview' : 'Output'}
          </div>

          <div className="flex-1 overflow-auto bg-white p-5 font-mono text-sm">
            {project.language === 'html' ? (
              <iframe
                ref={iframeRef}
                srcDoc={code}
                title="preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            ) : error ? (
              <span className="text-red-600">Error: {error}</span>
            ) : output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <span className="text-gray-400">
                Click Run to see output
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Editor;
