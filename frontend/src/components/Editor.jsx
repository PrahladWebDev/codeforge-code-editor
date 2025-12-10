import React, { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import axiosInstance from "../utils/axios";

import {
  Save,
  Play,
  RotateCw,
  Download,
  Trash2,
  WrapText,
  Minus,
  Plus
} from "lucide-react";

// Ace essentials
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

// Most common modes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-sh";

// Dynamic mode loader
const loadMode = async (lang) => {
  try {
    switch (lang) {
      case "java":
        await import("ace-builds/src-noconflict/mode-java");
        break;
      case "cpp":
      case "c":
        await import("ace-builds/src-noconflict/mode-c_cpp");
        break;
      case "go":
      case "golang":
        await import("ace-builds/src-noconflict/mode-golang");
        break;
      case "ruby":
        await import("ace-builds/src-noconflict/mode-ruby");
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("Mode loading failed:", err);
  }
};

function Editor({ project, onRefresh }) {
  const [code, setCode] = useState(project.code || "");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const [fontSize, setFontSize] = useState(16);
  const [wrap, setWrap] = useState(true);

  const iframeRef = useRef(null);

  // ----------------------------
  // FIX: Prevent code overwrite
  // ----------------------------
  useEffect(() => {
    setCode((prev) => (prev === project.code ? project.code : prev));

    loadMode(project.language === "go" ? "golang" : project.language);

    setError("");
    setOutput("");
  }, [project._id]);

  // ----------------------------
  // Auto-save (3 sec debounce)
  // ----------------------------
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
  }, [code]);

  // ----------------------------
  // Manual Save
  // ----------------------------
  const handleSave = async () => {
    if (saving || code === project.code) return;

    setSaving(true);

    try {
      await axiosInstance.put(`/projects/${project._id}`, { code });

      setIsSaved(true);
      onRefresh();
    } catch (err) {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------
  // Run Code
  // ----------------------------
  const handleRun = async () => {
    setRunning(true);
    setError("");
    setOutput("");

    try {
      if (project.language === "javascript") {
        const logs = [];
        const originalLog = console.log;

        console.log = (...args) => logs.push(args.join(" "));

        try {
          new Function(code)();
          setOutput(logs.join("\n") || "No output (use console.log)");
        } catch (err) {
          setError(String(err));
        }

        console.log = originalLog;
      }

      else if (project.language === "html") {
        iframeRef.current.srcdoc = code;
        setOutput("Preview updated");
      }

      else {
        const res = await axiosInstance.post("/execute", {
          code,
          language: project.language,
        });

        setOutput(res.data.output || "");
        if (res.data.error) setError(res.data.error);
      }
    } catch (err) {
      setError("Execution error");
    } finally {
      setRunning(false);
    }
  };

  // ----------------------------
  // Extra Tools
  // ----------------------------
  const handleFormat = () => {
    try {
      if (project.language === "javascript") {
        setCode(window.js_beautify(code));
      }
      if (project.language === "json") {
        setCode(JSON.stringify(JSON.parse(code), null, 2));
      }
      if (project.language === "html") {
        setCode(code.replace(/></g, ">\n<"));
      }
    } catch {
      alert("Cannot format code");
    }
  };

  const handleClear = () => {
    if (!window.confirm("Clear editor?")) return;
    setCode("");
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${project.name}.${project.language}`;
    link.click();
  };

  // ----------------------------
  // Ace Mode Mapping
  // ----------------------------
  const aceMode =
    project.language === "cpp"
      ? "c_cpp"
      : project.language === "go"
      ? "golang"
      : project.language;

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">

      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold">{project.name}</h2>
          <p className="text-sm text-gray-400">{project.language.toUpperCase()}</p>
        </div>

        <div className="flex items-center space-x-3">

          <span className={`${isSaved ? "text-green-400" : "text-yellow-400"} text-sm`}>
            {saving ? "Saving..." : isSaved ? "Saved" : "Unsaved Changes"}
          </span>

          <button
            onClick={handleSave}
            disabled={saving || isSaved}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <Save size={20} />
          </button>

          <button
            onClick={handleRun}
            disabled={running}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            <Play size={20} />
          </button>
        </div>
      </div>

      {/* Tools Bar */}
      <div className="bg-gray-800 text-white px-4 py-2 flex flex-wrap gap-4 items-center">

        <button onClick={handleFormat} className="flex items-center gap-2">
          <RotateCw size={18} /> Format
        </button>

        <button onClick={handleDownload} className="flex items-center gap-2">
          <Download size={18} /> Download
        </button>

        <button onClick={handleClear} className="flex items-center gap-2 text-red-300">
          <Trash2 size={18} /> Clear
        </button>

        <button onClick={() => setWrap(!wrap)} className="flex items-center gap-2">
          <WrapText size={18} /> {wrap ? "Disable Wrap" : "Enable Wrap"}
        </button>

        <div className="flex items-center gap-2">
          <Minus size={16} onClick={() => setFontSize((f) => Math.max(10, f - 1))} />
          <span>{fontSize}px</span>
          <Plus size={16} onClick={() => setFontSize((f) => f + 1)} />
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
            width="100%"
            height="100%"
            fontSize={fontSize}
            wrapEnabled={wrap}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              tabSize: 2,
            }}
          />
        </div>

        {/* Output */}
        <div className="lg:w-96 bg-gray-50 border-l border-gray-300">
          <div className="bg-gray-800 text-white px-4 py-3">
            {project.language === "html" ? "Live Preview" : "Output"}
          </div>

          <div className="p-4 overflow-auto font-mono text-sm h-full">
            {project.language === "html" ? (
              <iframe
                ref={iframeRef}
                srcDoc={code}
                title="Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            ) : error ? (
              <pre className="text-red-600">{error}</pre>
            ) : (
              <pre className="whitespace-pre-wrap">{output}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
