# track-node-version

A CLI tool to automatically detect and track the Node.js version used in a project. It stores the version in `.nvmrc` and updates `package.json` to ensure consistency across development environments.

## 📌 Features

- **Automatically detects** the current Node.js version.
- **Writes the version** to `.nvmrc`.
- **Updates `package.json`** with the required Node.js version.
- **Warns developers** if they use an incompatible Node.js version.
- **Works seamlessly** with npm, yarn, and pnpm.
- **Lightweight** and requires no additional configuration.

---

## 🚀 Installation

### **Global Installation**

To install the tool globally:

```sh
npm install -g track-node-version
```

### **Use without Installation**

You can run it using `npx` without installing:

```sh
npx track-node-version
```

### **Add to Your Project (Recommended)**

To ensure consistency, add it as a development dependency:

```sh
npm install --save-dev track-node-version
```

Then, add it to your `package.json` scripts:

```json
"scripts": {
  "track-node": "track-node-version"
}
```

Now, run:

```sh
npm run track-node
```

---

## 📌 Usage

### **1. Track the Node.js Version**

Simply run:

```sh
track-node-version
```

This will:
✅ Detect your current Node.js version.
✅ Save it to `.nvmrc`.
✅ Update the `engines` field in `package.json`.

### **2. Automatically Enforce Node.js Version**

To ensure all developers use the correct Node.js version, add this script to `server.js` or `index.js`:

```js
import { engines } from "./package.json";

const expectedNodeVersion = engines?.node || "unknown";

if (!process.version.startsWith(expectedNodeVersion.replace(">=", ""))) {
    console.warn(`⚠️ Warning: Expected Node.js ${expectedNodeVersion}, but using ${process.version}`);
}
```

### **3. Enforce Version with Git Hooks**

Use `husky` to prevent commits if the Node.js version is incorrect:

```sh
npx husky add .husky/pre-commit "npx track-node-version"
```

This ensures every commit is made using the correct Node.js version.

---

## 🛠 Example Use Cases

### **1. Team Collaboration**

**Problem:** Developers on a team may use different Node.js versions, causing inconsistencies and errors.
**Solution:** `track-node-version` ensures all team members use the same version by storing it in `.nvmrc` and `package.json`.

### **2. Open Source Projects**

**Problem:** Contributors may unknowingly use an unsupported Node.js version.
**Solution:** The tool auto-detects and warns them about version mismatches.

### **3. CI/CD Pipelines**

**Problem:** CI/CD environments may use different Node.js versions, causing builds to fail.
**Solution:** Set the correct version in `.nvmrc`, and CI/CD pipelines can use `nvm use` to match it.

```yaml
# Example GitHub Actions Workflow
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: nvm install $(cat .nvmrc)
      - run: node -v  # Ensures the correct version is used
```

---

## 📖 FAQ

### **1. What happens if I switch Node.js versions?**

Run `track-node-version` again, and it will update `.nvmrc` and `package.json` accordingly.

### **2. Does this tool install Node.js for me?**

No, it only detects and records the version. Use `nvm` or `fnm` to install the correct version.

### **3. Can I specify a custom location for `.nvmrc`?**

Currently, `.nvmrc` is stored in the project root. Future updates may allow customization.

---

## 📜 License

MIT License

---

## 🌟 Contributing

Feel free to open issues or submit pull requests!

```sh
git clone https://github.com/yourusername/track-node-version.git
cd track-node-version
npm install
git checkout -b new-feature
```

Happy coding! 
