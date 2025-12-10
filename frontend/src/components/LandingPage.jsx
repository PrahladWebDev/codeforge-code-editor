import React from "react";
import { Code2, Play, Save, Layers, Cpu, Github } from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* NAVBAR */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          CodeForge
        </h1>

        <div className="space-x-6 text-gray-700 font-medium">
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
          <a href="#how" className="hover:text-indigo-600 transition">How It Works</a>

          {/* Login Button */}
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold shadow"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-8 py-24 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
          Build, Run, and Save Code —  
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Instantly</span>
        </h2>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          CodeForge is a modern online editor supporting JavaScript, Python, C++, Go, Java, HTML, CSS, and more.
          Save projects, run code instantly, and work from anywhere — all inside your browser.
        </p>

        <Link
          to="/login"
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition shadow-xl text-white"
        >
          Start Coding – It’s Free
        </Link>

        <div className="mt-16">
          <img
            src="/preview.png"
            alt="CodeForge Editor Preview"
            className="rounded-xl shadow-xl border border-gray-200"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-8 py-20 bg-gray-50">
        <h3 className="text-center text-4xl font-bold mb-12">Why CodeForge?</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Code2 className="w-10 h-10 text-indigo-600" />}
            title="Powerful Editor"
            desc="Syntax highlighting, autocomplete, and multi-language support built right in."
          />

          <FeatureCard
            icon={<Play className="w-10 h-10 text-green-600" />}
            title="Run Code Instantly"
            desc="Execute JavaScript locally or use our cloud sandbox for compiled languages."
          />

          <FeatureCard
            icon={<Save className="w-10 h-10 text-yellow-600" />}
            title="Auto-Save Projects"
            desc="Your work is automatically saved — no more losing progress."
          />

          <FeatureCard
            icon={<Layers className="w-10 h-10 text-purple-600" />}
            title="Multi-language Support"
            desc="Write Python, Java, C++, Go, HTML, CSS, and more in one place."
          />

          <FeatureCard
            icon={<Cpu className="w-10 h-10 text-pink-600" />}
            title="Cloud Execution"
            desc="Run heavy programs on our servers while keeping your device fast."
          />

          <FeatureCard
            icon={<Github className="w-10 h-10 text-gray-800" />}
            title="GitHub Sync"
            desc="Export or sync your code with GitHub (coming soon)."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-8 py-24 max-w-5xl mx-auto">
        <h3 className="text-center text-4xl font-bold mb-10">How It Works</h3>

        <div className="space-y-10 text-gray-700 text-lg">
          <Step num="01" title="Create an account">
            Sign in with email and start coding immediately — setup in under a minute.
          </Step>

          <Step num="02" title="Create a new project">
            Pick your language and begin writing in the modern, lightning-fast editor.
          </Step>

          <Step num="03" title="Run your code">
            View instant output or live HTML/CSS preview without leaving the browser.
          </Step>

          <Step num="04" title="Save & manage projects">
            All your files are auto-saved and accessible from any device at any time.
          </Step>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-10 text-center text-gray-600 border-t border-gray-200 bg-white">
        <p>© {new Date().getFullYear()} CodeForge — Build. Run. Create.</p>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 shadow hover:shadow-md transition">
    <div className="mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const Step = ({ num, title, children }) => (
  <div className="flex items-start space-x-6">
    <div className="text-4xl font-extrabold text-indigo-600">{num}</div>
    <div>
      <h4 className="text-2xl font-bold mb-2">{title}</h4>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

export default LandingPage;
