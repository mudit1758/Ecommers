# 🚀 Installation Guide

The error occurs because the `razorpay` npm package hasn't been installed yet. Follow these steps to fix it:

## ✅ Solution 1: Using install.bat (Easiest - Windows)

1. **Double-click** `install.bat` in the project folder
2. Wait for installation to complete
3. Run `npm run dev` to start the server

## ✅ Solution 2: Using Node script

1. **Open Command Prompt** (not PowerShell) in the project folder
2. Run:
   ```bash
   node install.js
   ```
3. Run `npm run dev` to start the server

## ✅ Solution 3: Manual installation

1. **Open Command Prompt** (NOT PowerShell) - Right-click and select "Command Prompt"
2. Navigate to project:
   ```bash
   cd "c:\Users\Mudit Raj\Desktop\Ecommers"
   ```
3. Install all dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## ✅ Solution 4: Using VS Code Terminal

1. Open VS Code
2. Open the integrated terminal (Ctrl + `)
3. Make sure it's NOT PowerShell - switch to "cmd" if needed
4. Run:
   ```bash
   npm install
   npm run dev
   ```

---

## 🔑 Set Up Environment Variables

After installing dependencies:

1. Edit `.env.local` file
2. Add your Razorpay credentials:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   NEXT_PUBLIC_API_URL=http://localhost:3000
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
   ```

Get free test keys from [Razorpay Dashboard](https://dashboard.razorpay.com)

---

## 🗄️ Set Up MongoDB

Option A: Local MongoDB
```bash
mongod
```

Option B: MongoDB Atlas (Cloud)
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string and update `.env.local`

---

## ▶️ Start the Application

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 📦 Common Issues & Solutions

### PowerShell Execution Policy Error
**Use Command Prompt (cmd.exe) instead of PowerShell**

### Module not found: 'razorpay'
- Run `npm install`
- Delete `node_modules` folder and `.next` folder, then run `npm install` again

### MongoDB Connection Error
- Ensure MongoDB is running locally OR
- Update MONGODB_URI in `.env.local` with your MongoDB Atlas connection string

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

---

## 📁 Project Structure After Installation

```
Ecommers/
├── node_modules/              ← All packages (created after npm install)
├── .next/                      ← Build files (created after npm run dev)
├── app/
│   ├── api/
│   ├── page.jsx
│   └── layout.jsx
├── components/
├── models/
├── store/
├── package.json                ← Lists all dependencies
├── .env.local                  ← Your API keys (create this)
├── install.bat                 ← Double-click to install
├── install.js                  ← Node script to install
└── README.md
```

---

## ✨ What Gets Installed

```
npm install
```

Installs these packages into `node_modules/`:

- **next** - React framework
- **react** - UI library
- **mongoose** - MongoDB ORM
- **razorpay** - Payment gateway
- **zustand** - State management
- **tailwindcss** - CSS framework
- **lucide-react** - Icons
- And their dependencies (~500+ packages)

---

## ✅ Verify Installation

After running `npm install`, you should see:

```
added XXX packages in X.XXs
```

And these folders should exist:
- ✅ `node_modules/` folder
- ✅ `package-lock.json` file

---

## 🆘 Still Having Issues?

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Delete and reinstall:**
   ```bash
   rmdir node_modules /s /q
   del package-lock.json
   npm install
   ```

3. **Check Node.js version:**
   ```bash
   node --version
   npm --version
   ```
   (Should be Node 16+ and npm 7+)

---

## 🎉 Success!

After setup, you'll have a fully functional e-commerce app with:
- ✅ Product catalog
- ✅ Shopping cart
- ✅ Razorpay payments
- ✅ MongoDB database
- ✅ Modern UI with Tailwind CSS
