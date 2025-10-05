import React, { useState } from "react";
import axios from "axios";

const stacks = [
  { id: "node", label: "Node.js (npm)" },
  { id: "python", label: "Python (pip / pytest)" },
  { id: "java", label: "Java (Maven)" }
];

export default function GeneratorForm({ onStart, onDone, onError }) {
  const [techStack, setTechStack] = useState("node");
  const [projectName, setProjectName] = useState("");
  const [optimize, setOptimize] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!projectName) return onError("Project name required.");
    onStart();

    try {
      const res = await axios.post("https://baseline-backend-931f.onrender.com/generate", {
      techStack,
      projectName,
      optimize,
      });
      if (res.data && res.data.yaml) {
        onDone({ yaml: res.data.yaml, meta: { techStack, projectName } });
      } else {
        onError("No YAML returned from server.");
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data || err.message || "Request failed";
      onError(msg);
    }
  }

  return (
  <form onSubmit={handleSubmit} className="form-panel">
    <h2 className="title">Generate CI/CD YAML</h2>

    <div className="form-group">
      <label>Project name</label>
      <input
        className="input"
        placeholder="e.g. my-app"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>Tech stack</label>
      <select className="input" value={techStack} onChange={(e) => setTechStack(e.target.value)}>
        {stacks.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </div>

    <label className="checkbox">
      <input type="checkbox" checked={optimize} onChange={(e) => setOptimize(e.target.checked)} />
      <span>AI optimize</span>
    </label>

    <button className="btn primary" type="submit">
      Generate YAML
    </button>

    <p className="hint">
      💡 Tip: Use names like <code>node-demo</code> or <code>python-service</code> for testing.
    </p>
  </form>
);
}
