import React, { useState } from "react";
import GeneratorForm from "./components/GeneratorForm";
import CodePreview from "./components/CodePreview";
import "./index.css";

function App() {
  const [yaml, setYaml] = useState("");
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ techStack: "", projectName: "", template: "" });
React.useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  const toggle = document.getElementById("themeToggle");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    if (toggle) toggle.textContent = "🌞";
  } else {
    document.body.classList.remove("light-theme");
    if (toggle) toggle.textContent = "🌙";
  }
}, []);

  return (
    <div className="app-container">
      <header className="header">
  <div>
    <h1>⚙️ ConfigGen</h1>
    <p>AI-powered CI/CD config generator</p>
  </div>

  <button
  className="theme-toggle"
  id="themeToggle"
  onClick={() => {
    const body = document.body;
    const toggle = document.getElementById("themeToggle");
    const isLight = body.classList.toggle("light-theme");
    toggle.textContent = isLight ? "🌞" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }}
>
  🌙
</button>

</header>


      <main>
        <div className="panel">
          <GeneratorForm
            onStart={() => setLoading(true)}
            onDone={(data) => {
              setYaml(data.yaml);
              setMeta(data.meta);
              setLoading(false);
            }}
            onError={() => setLoading(false)}
          />
        </div>

        <div className="panel">
          <CodePreview yaml={yaml} loading={loading} meta={meta} />
        </div>
      </main>

      <footer className="footer">
        Built with ❤️ using OpenAI & React
      </footer>
    </div>
  );
}

export default App;
