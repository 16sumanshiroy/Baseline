# ⚙️ Baseline ConfigGen — AI-Powered CI/CD Generator

> Generate CI/CD pipelines with AI — smart, optimized, and explained.

---

## ✨ Features

- 🤖 **Generate YAML** for GitHub Actions, GitLab CI, Jenkins  
- ⚙️ **AI Optimize** — add caching and build enhancements  
- 💬 **Explain YAML** — get plain English descriptions  
- 🌗 **Dark / Light Theme**  
- 📂 **Copy / Download YAML** in one click  

---

## 🧯 Tech Stack

- **Frontend:** React + CSS  
- **Backend:** Node.js + Express  
- **AI Integration:** OpenAI API (with fallback mode)  

---

## 🚀 Setup / Run Instructions

```bash
# Clone repo
git clone https://github.com/16sumanshiroy/Baseline.git
cd Baseline

# Start backend
cd Backend
npm install
node server.js

# Start frontend
cd ../frontend
npm install
npm start
```
Open your browser at `http://localhost:3000`.

---
## 🌐 Live Demo
👉 [https://baseline-configgen.vercel.app](https://baseline-configgen.vercel.app)

---

## 🖼 Screenshots

### Main UI
![Main UI Screenshot](./screenshots/main-ui.png)

### YAML Generate / Optimize
![YAML Screenshot](./screenshots/yaml.png)

### Explain Feature
![Explain Screenshot](./screenshots/explain.png)

> 📌 Upload screenshots into a `screenshots/` folder and adjust filenames above accordingly.

---

## 🌐 Live Demo

View the live demo (if hosted here):  
[https://your-deployment-url.com](https://your-deployment-url.com)

---

## 💡 How It Works

1. Frontend sends project name + tech stack to backend.  
2. Backend generates YAML (with optional AI enhancements).  
3. Frontend shows YAML + offers copy, download.  
4. “Explain YAML” sends it back to backend — returns explanation.  

---

## 🧭 Project Structure

```
Baseline/
 ├── Backend/
 ├── frontend/
 ├── README.md
 └── …
```

---

## 🌟 Future Improvements + Ideas

- Support more languages and CI platforms  
- Persist projects, offer templates  
- Integrate directly with GitHub (commit YAML)  
- Enhance “Explain YAML” with syntax highlighting  

---

## 👤 Author

**Sumanshi Roy**  
Built for Baseline Tooling Hackathon 2025  

---

## 📝 License

MIT License
