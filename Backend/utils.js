const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const templates = {
    node: `
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
          node-version: '18'
      - run: npm install
      - run: npm test
`,
    python: `
name: Python CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest
`,
    java: `
name: Java CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          java-version: '17'
      - run: mvn install
      - run: mvn test
`
};

async function generateYAML(techStack, projectName) {
    let template = templates[techStack.toLowerCase()] || templates.node;
    template = template.replace(/PROJECT_NAME/g, projectName);

    // AI optimization step
    try {
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a CI/CD pipeline expert." },
                { role: "user", content: `Optimize this GitHub Actions YAML:\n${template}` }
            ],
            temperature: 0.3,
        });

        return aiResponse.choices[0].message.content || template;
    } catch (e) {
        console.log("⚠️ AI optimization failed, returning template.");
        return template;
    }
}

module.exports = { generateYAML };
