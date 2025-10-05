# ⚙️ ConfigGen – AI-Powered CI/CD Config Generator

### 🧠 Overview
**ConfigGen** is an AI-driven tool that automatically generates ready-to-use **CI/CD configuration files** for multiple platforms like **GitHub Actions**, **GitLab CI**, and **Jenkins**, based on your project’s technology stack.

The tool eliminates manual setup by letting developers simply select their tech stack and instantly get a fully optimized YAML pipeline — with optional AI-powered enhancements for caching, testing, and performance.

---

### 🚀 Key Features
✅ **AI-Powered YAML Generation** – Generates production-ready CI/CD configs in seconds.  
✅ **Smart Tech Stack Detection** – Supports Node.js, Python, and Java out of the box.  
✅ **AI Optimization Mode** – Adds smart caching and build improvements automatically.  
✅ **Explain YAML (AI Assistant)** – Describes what each YAML does in plain English.  
✅ **Dark/Light Mode** – Smooth theme toggle with clean, glassy UI.  
✅ **Offline-Safe Demo Mode** – Works even without API credits (mock AI explanation).  
✅ **Beautiful UI** – Sleek, modern React interface with smooth animations and shimmer effects.

---

### 🧩 Tech Stack
- **Frontend:** React (Vite)  
- **Styling:** CSS3, custom theme variables, animations, glassmorphism  
- **Backend:** Node.js + Express  
- **AI Integration:** OpenAI API (GPT-4.1-mini) *(with fallback mock mode)*

---

### 🛠️ Setup & Run

#### 🔹 1. Clone Repository
```bash
git clone https://github.com/your-username/configgen.git
cd configgen
```

#### 🔹 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file:  
```bash
OPENAI_API_KEY=your_api_key_here   # Optional (for real AI mode)
```

Then run the server:  
```bash
node server.js
```
Server will start on:  
👉 `http://localhost:5000`

#### 🔹 3. Setup Frontend
```bash
cd ../Frontend
npm install
npm start
```

Open your browser at:  
👉 `http://localhost:3000`

---

### 💡 How It Works
1. User selects a **tech stack** and project name.  
2. The backend generates a CI/CD YAML file dynamically.  
3. If **AI Optimize** is enabled, additional improvements (like caching) are added.  
4. The **Explain YAML** feature describes the pipeline in plain English — either using OpenAI or a simulated explanation if offline.

---

### 🏆 Hackathon Value
- Solves the pain point of **manually configuring CI/CD pipelines**.  
- **Time-saving**, **cross-platform**, and **AI-assisted** — ideal for both beginners and DevOps engineers.  
- Fully responsive UI and instant feedback — ready to demo live.

---

### 💻 Example Output
```yaml
name: Node.js CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
```

> 🤖 *AI Explanation (Simulated)*  
> This YAML defines a CI/CD pipeline for Node.js projects. It installs dependencies, runs tests on each push, and uses caching for faster builds.

---

### ❤️ Built With
- React ⚛️  
- Node.js 🌐  
- Express 🚀  
- OpenAI 🤖  
- Passion for DevTools 💡
