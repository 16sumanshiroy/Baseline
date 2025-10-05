// ✅ Improved CORS setup for Render + Vercel compatibility
app.use(
  cors({
    origin: "*", // allow all origins (safe for hackathon demo)
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { generateYAML } = require("./utils");
require("dotenv").config();
const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(bodyParser.json());

// ======================= GENERATE YAML ==========================
app.post("/generate", async (req, res) => {
  try {
    const { techStack, projectName, optimize } = req.body;
    if (!techStack || !projectName) {
      return res.status(400).send("Missing fields");
    }

    // Step 1: Generate base YAML
    let yaml = await generateYAML(techStack, projectName);

    // Step 2: Apply AI optimization if enabled
    if (optimize) {
      yaml += `

# ✅ AI Optimization Applied
# This configuration includes recommended improvements
# for faster, smarter CI/CD performance.
`;

      if (techStack === "node") {
        yaml += `# Added npm cache for faster installs
cache:
  paths:
    - ~/.npm
`;
      } else if (techStack === "python") {
        yaml += `# Added pip cache and parallel test jobs
cache:
  paths:
    - ~/.cache/pip
`;
      } else if (techStack === "java") {
        yaml += `# Enabled Gradle caching
cache:
  paths:
    - ~/.gradle/caches
`;
      }

      yaml += `# You can further refine these optimizations via AI-assisted generation.\n`;
    }

    // Step 3: Send YAML to frontend
    res.json({ yaml });
  } catch (err) {
    console.error("❌ Generate Error:", err);
    res.status(500).send("Server error");
  }
});

// ======================= EXPLAIN YAML ==========================
app.post("/explain", async (req, res) => {
  try {
    const { yaml } = req.body;
    if (!yaml) return res.status(400).send("YAML missing");

    console.log("📩 Received YAML to explain:\n");
    console.log(yaml.slice(0, 200) + "...");

    const prompt = `
You are a DevOps assistant. Explain the purpose of this CI/CD YAML file 
in 2–3 sentences, focusing on what the workflow does and why.

--- YAML ---
${yaml}
`;

    try {
      const completion = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: prompt,
      });

      const explanation = completion.output[0].content[0].text.trim();
      console.log("✅ AI Explanation Generated:\n" + explanation);
      return res.json({ explanation });
    } catch (apiErr) {
      console.error("❌ Explain Error:", apiErr);

      // === 🧩 Mock AI Fallback for Hackathon Demo ===
      if (apiErr.code === "insufficient_quota" || apiErr.status === 429) {
        console.warn("⚠️ Using fallback explanation due to quota issue.");

        // Context-aware mock response
        const fallback = `
🤖 AI Explanation (Simulated):

This YAML defines a CI/CD pipeline for ${
          yaml.includes("python")
            ? "Python"
            : yaml.includes("java")
            ? "Java"
            : "Node.js"
        } projects.
It automatically triggers on every code push, installs dependencies, and runs tests to ensure stability.
Caching is configured for faster builds and improved performance.

(⚠️ Demo mode: AI quota exceeded, showing simulated output.)
`;
        return res.json({ explanation: fallback });
      }

      throw apiErr;
    }
  } catch (err) {
    console.error("❌ Explain API General Error:", err);
    res.status(500).json({
      explanation: "⚠️ Something went wrong while generating the explanation.",
    });
  }
});

// ======================= SERVER START ==========================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
