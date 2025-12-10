import React, { useState } from "react";
import { Code2, Play, Save, Layers, Cpu, Github, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* NAVBAR */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-3xl font-extrabold text-gray-800">
          CodeForge
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
          <a href="#features" className="hover:text-gray-900 transition">Features</a>
          <a href="#how" className="hover:text-gray-900 transition">How It Works</a>
          <a href="#pricing" className="hover:text-gray-900 transition">Pricing</a>

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition font-semibold"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-4">
          <a href="#features" className="block text-gray-700 hover:text-gray-900">Features</a>
          <a href="#how" className="block text-gray-700 hover:text-gray-900">How It Works</a>
          <a href="#pricing" className="block text-gray-700 hover:text-gray-900">Pricing</a>

          <Link
            to="/login"
            className="block w-full text-center px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition font-semibold"
          >
            Get Started
          </Link>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="px-6 md:px-12 py-20 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
          Build, Run, and Save Code — Instantly
        </h2>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          CodeForge is a powerful online editor supporting JavaScript, Python,
          C++, Go, Java, HTML, CSS, and more. Save your projects, run code
          instantly, and work from any device.
        </p>

        <Link
          to="/login"
          className="px-8 py-4 bg-gray-900 hover:bg-gray-700 text-white rounded-lg text-lg font-semibold transition shadow-md"
        >
          Start Coding – It’s Free
        </Link>

        <div className="mt-16">
          <img
            src="/preview.png"
            alt="CodeForge Editor Preview"
            className="rounded-xl shadow-2xl border border-gray-200"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 md:px-12 py-20 bg-white">
        <h3 className="text-center text-4xl font-bold mb-12 text-gray-900">
          Why CodeForge?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Code2 className="w-10 h-10 text-gray-700" />}
            title="Powerful Editor"
            desc="Syntax highlighting, autocomplete, and multi-language support."
          />

          <FeatureCard
            icon={<Play className="w-10 h-10 text-green-600" />}
            title="Run Code Instantly"
            desc="Execute JavaScript locally and run other languages securely."
          />

          <FeatureCard
            icon={<Save className="w-10 h-10 text-yellow-600" />}
            title="Auto-Save Projects"
            desc="Your work is saved automatically — never lose progress."
          />

          <FeatureCard
            icon={<Layers className="w-10 h-10 text-purple-700" />}
            title="Multi-language Support"
            desc="Python, Java, C++, Go, Ruby, HTML, CSS, and more."
          />

          <FeatureCard
            icon={<Cpu className="w-10 h-10 text-red-500" />}
            title="Cloud Execution"
            desc="Processes heavy tasks remotely so your device stays fast."
          />

          <FeatureCard
            icon={<Github className="w-10 h-10 text-gray-900" />}
            title="GitHub Integration"
            desc="Export or sync your code with GitHub (coming soon)."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 md:px-12 py-20 max-w-5xl mx-auto">
        <h3 className="text-center text-4xl font-bold mb-10 text-gray-900">
          How It Works
        </h3>

        <div className="space-y-10 text-gray-700 text-lg">
          <Step num="01" title="Create an account">
            Sign in and start coding instantly.
          </Step>

          <Step num="02" title="Create a new project">
            Choose a language and begin writing code.
          </Step>

          <Step num="03" title="Run your code">
            Get real-time output and live preview for HTML/CSS.
          </Step>

          <Step num="04" title="Save & manage files">
            All your projects are securely stored in the cloud.
          </Step>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 md:px-12 py-20 bg-gray-100">
        <h3 className="text-center text-4xl font-bold mb-12 text-gray-900">
          Simple Pricing
        </h3>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Free Plan */}
          <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-sm">
            <h4 className="text-2xl font-bold mb-4 text-gray-900">Free Plan</h4>
            <ul className="space-y-3 text-gray-700">
              <li>✔ Unlimited coding</li>
              <li>✔ Save projects</li>
              <li>✔ HTML live preview</li>
              <li>✔ JS execution</li>
              <li>✔ Limited cloud time</li>
            </ul>
            <p className="text-3xl font-bold mt-6 text-gray-900">₹0</p>
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-bold mb-4">Pro Plan</h4>
            <ul className="space-y-3">
              <li>✔ Unlimited cloud runtime</li>
              <li>✔ Faster execution</li>
              <li>✔ More languages</li>
              <li>✔ Larger project size</li>
              <li>✔ Priority support</li>
            </ul>
            <p className="text-3xl font-bold mt-6">₹299/mo</p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-10 text-center text-gray-600 border-t border-gray-300 bg-white">
        <p>© {new Date().getFullYear()} CodeForge — Build. Run. Create.</p>
      </footer>

    </div>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
    <div className="mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2 text-gray-900">{title}</h4>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const Step = ({ num, title, children }) => (
  <div className="flex items-start space-x-6">
    <div className="text-4xl font-extrabold text-gray-400">{num}</div>
    <div>
      <h4 className="text-2xl font-bold mb-2 text-gray-900">{title}</h4>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

export default LandingPage;
