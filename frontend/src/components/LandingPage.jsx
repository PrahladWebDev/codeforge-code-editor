import React from "react";
import { Code2, Play, Save, Layers, Cpu, Github } from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* NAVBAR */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          CodeForge
        </h1>

        <div className="space-x-6 text-gray-300">
          <a href="#features" className="hover:text-indigo-400">Features</a>
          <a href="#how" className="hover:text-indigo-400">How It Works</a>
          <a href="#pricing" className="hover:text-indigo-400">Pricing</a>
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-8 py-24 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
          Build, Run, and Save Code —  
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Instantly</span>
        </h2>

        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
          CodeForge is a powerful online editor supporting JavaScript, Python, C++, Go, Java, HTML, CSS, and more.
          Save your projects, run code instantly, and work from anywhere — all in your browser.
        </p>

        <Link
          to="/login"
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition shadow-xl"
        >
          Start Coding – It’s Free
        </Link>

        <div className="mt-16">
          <img
            src="/preview.png"
            alt="CodeForge Editor Preview"
            className="rounded-xl shadow-2xl border border-gray-800"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-8 py-20 bg-gray-900 bg-opacity-40">
        <h3 className="text-center text-4xl font-bold mb-12">Why CodeForge?</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Code2 className="w-10 h-10 text-indigo-400" />}
            title="Powerful Editor"
            desc="Syntax highlighting, autocomplete, snippets, and multiple language support built in."
          />

          <FeatureCard
            icon={<Play className="w-10 h-10 text-green-400" />}
            title="Run Code Instantly"
            desc="Execute JavaScript locally and run other languages securely on our cloud sandbox."
          />

          <FeatureCard
            icon={<Save className="w-10 h-10 text-yellow-300" />}
            title="Auto-Save Projects"
            desc="Your code is automatically saved while you type — never lose work again."
          />

          <FeatureCard
            icon={<Layers className="w-10 h-10 text-purple-400" />}
            title="Multi-language Support"
            desc="Work with Python, Java, C++, Go, Ruby, HTML, CSS, and more in one place."
          />

          <FeatureCard
            icon={<Cpu className="w-10 h-10 text-pink-400" />}
            title="Cloud Execution"
            desc="Heavy code runs in our execution engine so your device stays fast."
          />

          <FeatureCard
            icon={<Github className="w-10 h-10 text-gray-300" />}
            title="GitHub Friendly"
            desc="Export or sync your code with GitHub (coming soon)."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-8 py-24 max-w-5xl mx-auto">
        <h3 className="text-center text-4xl font-bold mb-10">How It Works</h3>

        <div className="space-y-10 text-gray-300 text-lg">
          <Step num="01" title="Create an account">
            Sign in with email and start coding immediately — setup takes less than 1 minute.
          </Step>

          <Step num="02" title="Create a new project">
            Choose your preferred language and start typing in a fast, modern editor.
          </Step>

          <Step num="03" title="Run your code instantly">
            Use the built-in runner with real-time output and live preview for HTML.
          </Step>

          <Step num="04" title="Save & manage all your files">
            All your work is automatically saved and accessible from any device.
          </Step>
        </div>
      </section>

      {/* PRICING (Simple Section) */}
      <section id="pricing" className="px-8 py-24 bg-gray-900 bg-opacity-40">
        <h3 className="text-center text-4xl font-bold mb-12">Simple Pricing</h3>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h4 className="text-2xl font-bold mb-4">Free Plan</h4>
            <ul className="space-y-3 text-gray-300">
              <li>✔ Unlimited coding</li>
              <li>✔ Project saving</li>
              <li>✔ HTML live preview</li>
              <li>✔ JavaScript execution</li>
              <li>✔ Cloud execution (limited)</li>
            </ul>
            <p className="text-3xl font-bold mt-6">₹0</p>
          </div>

          <div className="bg-indigo-600 p-8 rounded-xl shadow-lg">
            <h4 className="text-2xl font-bold mb-4">Pro Plan</h4>
            <ul className="space-y-3">
              <li>✔ Unlimited cloud execution</li>
              <li>✔ Faster run times</li>
              <li>✔ More languages</li>
              <li>✔ Larger projects</li>
              <li>✔ Priority support</li>
            </ul>
            <p className="text-3xl font-bold mt-6">₹299/mo</p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-10 text-center text-gray-400 border-t border-gray-800">
        <p>© {new Date().getFullYear()} CodeForge — Build. Run. Create.</p>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-lg hover:border-indigo-500 transition">
    <div className="mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-400">{desc}</p>
  </div>
);

const Step = ({ num, title, children }) => (
  <div className="flex items-start space-x-6">
    <div className="text-4xl font-extrabold text-indigo-500">{num}</div>
    <div>
      <h4 className="text-2xl font-bold mb-2">{title}</h4>
      <p className="text-gray-400">{children}</p>
    </div>
  </div>
);

export default LandingPage;
