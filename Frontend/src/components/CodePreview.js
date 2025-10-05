import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodePreview({ yaml, loading, meta }) {
  const [explanation, setExplanation] = useState("");
  const [explaining, setExplaining] = useState(false);

  function downloadFile() {
    const blob = new Blob([yaml], { type: "text/yaml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meta.projectName || "ci-pipeline"}.yml`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleExplain() {
    if (!yaml) return;
    setExplaining(true);
    setExplanation("");

    try {
      const res = await fetch("http://localhost:5000/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yaml }),
      });

      const data = await res.json();
      setExplanation(data.explanation || "⚠️ No explanation generated.");
    } catch (err) {
      console.error(err);
      setExplanation("❌ Failed to connect to backend for explanation.");
    } finally {
      setExplaining(false);
    }
  }

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h3>Generated CI/CD YAML</h3>
        <span className="meta">
          {meta.techStack
            ? `${meta.techStack.toUpperCase()} • ${meta.projectName}`
            : ""}
        </span>
      </div>

      <div className="preview-body">
        {loading && (
          <div className="loading shimmer-box">
            <div className="shimmer-line" style={{ width: "60%" }}></div>
            <div className="shimmer-line" style={{ width: "90%" }}></div>
            <div className="shimmer-line" style={{ width: "75%" }}></div>
          </div>
        )}

        {!loading && yaml && (
          <div className="fade-in">
            <div className="code-box">
              <SyntaxHighlighter
                language="yaml"
                style={coldarkDark}
                showLineNumbers
              >
                {yaml}
              </SyntaxHighlighter>
            </div>

            <div className="actions">
              <button
                className="btn ghost"
                onClick={() => {
                  navigator.clipboard.writeText(yaml);

                  // ✅ Show "Copied!" toast feedback
                  const toast = document.createElement("div");
                  toast.className = "toast";
                  toast.textContent = "✅ Copied!";
                  document.body.appendChild(toast);

                  setTimeout(() => toast.classList.add("show"), 10);
                  setTimeout(() => {
                    toast.classList.remove("show");
                    setTimeout(() => toast.remove(), 300);
                  }, 1500);
                }}
              >
                Copy
              </button>

              <button className="btn primary" onClick={downloadFile}>
                Download YAML
              </button>

              <button
                className="btn ghost"
                disabled={explaining}
                onClick={handleExplain}
              >
                {explaining ? "🤖 Explaining..." : "🤖 Explain YAML"}
              </button>
            </div>

            {explanation && (
              <div className="ai-explanation fade-in">
                <h4>🤖 YAML Explanation</h4>
                <p>{explanation}</p>
              </div>
            )}
          </div>
        )}

        {!loading && !yaml && (
          <div className="empty-state">
            No YAML yet — fill the form and click <b>Generate YAML</b>.
          </div>
        )}
      </div>
    </div>
  );
}
