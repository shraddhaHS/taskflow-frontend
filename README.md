# 📌 Task Management Frontend 

## 🚀 Overview

This is the **frontend** of a Task Management application built using **React**.
It provides a clean and modular interface for managing tasks with full API integration.

Users can:

* Create tasks
* Update status
* Delete tasks
* Filter and search tasks dynamically

---

## 🛠️ Tech Stack

* ⚛️ React (with Hooks)
* ⚡ Vite (fast build tool)
* 🌐 Axios (API calls)
* 🎨 Tailwind CSS
* 🧩 Modular folder structure

---

## 📂 Project Structure

```bash
src/
 ├── api/          # API call functions (Axios)
 ├── assets/       # Images / static files
 ├── components/   # Reusable UI components
 ├── hooks/        # Custom React hooks
 ├── utils/        # Helper functions
 ├── App.jsx       # Main app component
 ├── main.jsx      # Entry point
 ├── App.css
 └── index.css
```

---

## ✨ Features

* ✅ Add new tasks
* 📋 Display task list
* 🔄 Update task status
* ❌ Delete tasks
* 🔍 Search tasks by title
* 🎯 Filter tasks by status
* ⚡ Fast UI with Vite

---

## ⚙️ Setup Instructions

### 1. Clone repository

```bash
git clone https://github.com/shraddhaHS/taskflow-frontend
cd taskflow-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

App will run on:

```
http://localhost:5173
```

---

## 🔗 Backend Integration

Make sure backend is running at:

```
http://localhost:5000
```

### API Base URL

Configure inside your API file (e.g. `src/api/taskApi.js`):

```js
const VITE_API_BASE_URL = "http://localhost:5000";
```

---

## 📡 API Endpoints Used

* `GET /tasks` → Fetch tasks (supports filters & search)
* `POST /tasks` → Create task
* `PUT /tasks/:id` → Update task
* `DELETE /tasks/:id` → Delete task

---

## 🔍 Filtering & Search

* Filter example:

```
/tasks?status=completed
```

* Search example:

```
/tasks?search=meeting
```

---

## 🧪 Usage Guide

1. Type a task → Click **Add**
2. Use dropdown to filter tasks
3. Use search bar for quick lookup
4. Actions:

   * **Start** → mark as in-progress
   * **Done** → mark as completed
   * **Delete** → remove task

---

## 📸 Screenshots
<img width="2560" height="2260" alt="taskflow-frontend-xi-puce vercel app_ (1)" src="https://github.com/user-attachments/assets/d03eb3f6-0d46-4494-a388-ff51ccc760d4" />
<img width="2560" height="2260" alt="taskflow-frontend-xi-puce vercel app_ (2)" src="https://github.com/user-attachments/assets/f5631015-7030-4acc-90b1-117081a605dd" />
<img width="2560" height="1994" alt="taskflow-frontend-xi-puce vercel app_ (3)" src="https://github.com/user-attachments/assets/42c39cd3-657f-4107-81ec-ac94fdb38e8e" />



---





