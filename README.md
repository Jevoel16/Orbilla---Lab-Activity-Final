# 🚀 Cryp-Cross MERN Application

> A complete full-stack CRUD application with React frontend, Express backend, and MongoDB database for managing project logs.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [CRUD Operations](#crud-operations)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Cryp-Cross is a MERN (MongoDB, Express, React, Node.js) full-stack application that demonstrates a complete implementation of CRUD operations integrated with a modern web stack.

### Activity Requirements Met ✅
- [x] Complete CRUD API routes (Create, Read, Update, Delete)
- [x] Full frontend integration with backend
- [x] Secure environment variable configuration
- [x] Deployment-ready production setup
- [x] Comprehensive error handling and validation

---

## ✨ Features

### Frontend (React)
- 📊 **Dynamic Project List** - View all projects with auto-sorting by creation date
- ➕ **Create Projects** - Add new projects through an easy-to-use form
- 🔄 **Update Status** - Cycle project status (Pending → InProgress → Complete)
- 🗑️ **Delete Projects** - Remove projects with confirmation dialog
- 🔍 **View Details** - See full project information on detail page
- 🌓 **Dark/Light Theme** - Toggle between dark and light modes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🧭 **React Router** - Smooth navigation between pages

### Backend (Express)
- ✅ RESTful API with 4 endpoints (GET, POST, PATCH, DELETE)
- 🔐 CORS enabled for cross-origin requests
- 📦 MongoDB with Mongoose ODM
- 🛡️ Input validation and error handling
- ♻️ Async/await for clean asynchronous code
- 🌍 Environment-based configuration

### Database (MongoDB)
- 📄 Project schema with title, description, status, timestamps
- ⏱️ Automatic createdAt/updatedAt fields
- 🔑 Unique MongoDB ObjectIds
- 📊 MongoDB Atlas cloud hosting

---

## 🛠️ Tech Stack

**Frontend:**
- React 19
- React Router v7
- CSS3 (custom styling)
- Fetch API for HTTP requests

**Backend:**
- Node.js
- Express.js
- Mongoose ODM
- CORS middleware

**Database:**
- MongoDB Atlas (cloud)

**Deployment:**
- Vercel (React frontend)
- Render (Express backend)

---

## 📁 Project Structure

```
Orbilla - Lab Activity Final/
│
├── src/                          # React Frontend
│   ├── App.js                    # Main React component with all CRUD logic
│   ├── App.css                   # Styling
│   ├── config.js                 # API endpoint configuration
│   ├── index.js                  # React entry point
│   └── index.css                 # Global styles
│
├── public/                       # Static files
│   ├── index.html
│   ├── manifest.json
│   └── img/                      # Team member images
│
├── Orbilla - Lab Activity 7/     # Express Backend
│   ├── server.js                 # Main Express server
│   ├── models/
│   │   └── projectLog.js         # MongoDB schema
│   ├── .env                      # Environment variables (NOT in git)
│   └── package.json              # Backend dependencies
│
├── package.json                  # Frontend dependencies & scripts
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
├── DEPLOYMENT_GUIDE.md           # Step-by-step deployment
├── PROJECT_README.md             # Project documentation
├── COMPLETION_CHECKLIST.md       # Requirements checklist
├── REQUIREMENTS_VERIFICATION.md  # Detailed verification
└── .env.example                  # Environment template
```

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free at https://www.mongodb.com/cloud/atlas)
- Git (optional, for version control)

### Option 1: Using Existing Project (Quick Start)

#### 1. Clone Repository
```bash
git clone <your-repo-url>
cd "Orbilla - Lab Activity Final"
```

#### 2. Backend Setup

Navigate to backend folder:
```bash
cd "Orbilla - Lab Activity 7"
npm install
```

Create `.env` file in the backend folder:
```env
PORT=5000
DATABASE_URL=your_mongodb_atlas_connection_string
```

#### 3. Frontend Setup

Go back to root directory:
```bash
cd ..
npm install
```

---

### Option 2: Creating Project from Scratch

#### Step 1: Create React Frontend

```bash
# Create new React app
npx create-react-app "Orbilla - Lab Activity Final"
cd "Orbilla - Lab Activity Final"

# Install React Router
npm install react-router-dom

# Install development dependencies (optional)
npm install --save-dev concurrently
```

#### Step 2: Create Backend Folder

```bash
# Create backend folder
mkdir "Orbilla - Lab Activity 7"
cd "Orbilla - Lab Activity 7"

# Initialize Node project
npm init -y

# Install backend dependencies
npm install express cors mongoose dotenv

# Create necessary folders and files
mkdir models
touch server.js .env
```

#### Step 3: Create MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and sign in
3. Create a new cluster (M0 free tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<username>` and `<password>` with your credentials
7. Copy final string to `.env` file

#### Step 4: Set Up Backend Server

Create `Orbilla - Lab Activity 7/server.js`:

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProjectLog = require('./models/projectLog');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// GET - Read all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await ProjectLog.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

// POST - Create new project
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required fields',
      });
    }

    const newProject = new ProjectLog({
      title,
      description,
      status: status || 'Pending',
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: savedProject,
    });
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

// PATCH - Update project
app.patch('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title && !description && !status) {
      return res.status(400).json({
        success: false,
        message: 'At least one field is required for update',
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;

    const updatedProject = await ProjectLog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    console.error('Error updating project:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

// DELETE - Remove project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await ProjectLog.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MERN Backend API',
    endpoints: {
      get: '/api/projects',
      post: '/api/projects',
      patch: '/api/projects/:id',
      delete: '/api/projects/:id',
    },
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

#### Step 5: Create MongoDB Model

Create `Orbilla - Lab Activity 7/models/projectLog.js`:

```javascript
const mongoose = require('mongoose');

const projectLogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'InProgress', 'Complete'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const ProjectLog = mongoose.model('ProjectLog', projectLogSchema);
module.exports = ProjectLog;
```

#### Step 6: Create Backend .env File

Create `Orbilla - Lab Activity 7/.env`:

```env
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<appname>
```

Replace with your actual MongoDB connection string.

#### Step 7: Set Up React Frontend - Config File

Create `src/config.js`:

```javascript
// API Configuration for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 
                     (process.env.NODE_ENV === 'production' 
                      ? 'https://your-backend-url.onrender.com'
                      : 'http://localhost:5000');

export const API_ENDPOINTS = {
    PROJECTS: `${API_BASE_URL}/api/projects`,
    PROJECT_BY_ID: (id) => `${API_BASE_URL}/api/projects/${id}`,
};

export default API_BASE_URL;
```

#### Step 8: Update React package.json

Add proxy to `package.json`:

```json
{
  "name": "app",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:5000",
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.6",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

#### Step 9: Build React Components

Replace `src/App.js` with complete CRUD implementation (see original project for full code).

Key features:
- useEffect hook for fetching data
- useState for state management
- async/await for API calls
- React Router for navigation
- Form for creating projects
- Table for displaying projects
- Buttons for update/delete

#### Step 10: Add Styling

Update `src/App.css` with styling for:
- Project table
- Form inputs
- Buttons
- Dark/light theme
- Responsive layout

#### Step 11: Create Additional Documentation Files

Create the following documentation files:

**DEPLOYMENT_GUIDE.md** - Step-by-step deployment instructions

**PROJECT_README.md** - Detailed project overview

**COMPLETION_CHECKLIST.md** - Requirements verification

**REQUIREMENTS_VERIFICATION.md** - Detailed requirement checking

**GITIGNORE** - Exclude sensitive files:

```
node_modules/
*/node_modules/
.env
.env.local
.env.production
build/
dist/
.DS_Store
.vscode/
.idea/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

---

## Step-by-Step Feature Implementation

### 1. Frontend - Data Fetching

```javascript
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    fetchProjects();
}, []);

const fetchProjects = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.PROJECTS);
        const data = await response.json();
        if (data.success) {
            setProjects(data.data);
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
    } finally {
        setLoading(false);
    }
};
```

### 2. Frontend - Create Handler

```javascript
const handleCreateProject = async (newProject) => {
    try {
        const response = await fetch(API_ENDPOINTS.PROJECTS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject),
        });
        const data = await response.json();
        if (data.success) {
            setProjects([data.data, ...projects]);
            return { success: true };
        }
    } catch (error) {
        console.error('Error creating project:', error);
        return { success: false, error: 'Failed to create' };
    }
};
```

### 3. Frontend - Update Handler

```javascript
const handleUpdateStatus = async (id, newStatus) => {
    setProjects(projects.map(p => 
        p._id === id ? { ...p, status: newStatus } : p
    ));
    
    try {
        await fetch(API_ENDPOINTS.PROJECT_BY_ID(id), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
    } catch (error) {
        console.error('Error updating status:', error);
    }
};
```

### 4. Frontend - Delete Handler

```javascript
const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    
    setProjects(projects.filter(p => p._id !== id));
    
    try {
        await fetch(API_ENDPOINTS.PROJECT_BY_ID(id), {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Error deleting project:', error);
    }
};
```

### 5. React Router Setup

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

<BrowserRouter>
  <NavBar />
  <main>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectLogPage projects={projects} />} />
      <Route path="/projects/new" element={<CreateProjectPage />} />
      <Route path="/projects/:id" element={<ProjectDetail projects={projects} />} />
    </Routes>
  </main>
  <Footer />
</BrowserRouter>
```

---

## Running the Complete Project

### Terminal 1: Start Backend
```bash
cd "Orbilla - Lab Activity 7"
node server.js
```

### Terminal 2: Start Frontend
```bash
npm start
```

### Expected Output
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

---



## 🚀 Running Locally

### Terminal 1 - Start Backend
```bash
cd "Orbilla - Lab Activity 7"
node server.js
```

You should see:
```
Server is running on http://localhost:5000
Database Connected
```

### Terminal 2 - Start Frontend
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 📡 API Endpoints

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://your-backend.onrender.com`

### Endpoints

#### Get All Projects
```http
GET /api/projects
```

#### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "title": "New Project",
  "description": "Project description",
  "status": "Pending"
}
```

#### Update Project
```http
PATCH /api/projects/:id
Content-Type: application/json

{
  "status": "InProgress"
}
```

#### Delete Project
```http
DELETE /api/projects/:id
```

---

## 🔄 CRUD Operations

### Create (C)
1. Click **"+ Create New Project"** button
2. Fill in form: Title, Description, Status
3. Click **"Create Project"**
4. Auto-redirects to task list
5. New project appears at top of list
6. ✅ Persists in database

### Read (R)
1. Navigate to **"Project Log"** page
2. View list of all projects
3. Click **"View Detail"** to see full info
4. List auto-sorts by creation date
5. ✅ Fetches from database on page load

### Update (U)
1. In task list, click **"Change Status"**
2. Status cycles: Pending → InProgress → Complete → Pending
3. ✅ Updates instantly in UI and database

### Delete (D)
1. In task list, click **"Delete"**
2. Confirm in popup dialog
3. Project removed from list
4. ✅ Deleted from database

---

## 🌐 Deployment

### Deploy Backend (Render)

1. **Create Render Account** → https://render.com

2. **Create Web Service**
   - Connect GitHub repository
   - Select backend folder: `Orbilla - Lab Activity 7`
   - Build command: `npm install`
   - Start command: `node server.js`

3. **Add Environment Variables**
   ```
   PORT=5000
   DATABASE_URL=your_mongodb_uri
   ```

4. **Deploy** and copy the URL (e.g., `https://your-app.onrender.com`)

### Deploy Frontend (Vercel)

1. **Create Vercel Account** → https://vercel.com

2. **Import Repository**
   - Select your GitHub repo
   - Root directory: (leave as is)
   - Framework: Create React App

3. **Add Environment Variable**
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com
   ```

4. **Deploy**

5. **Share Live URL** from Vercel dashboard

### Full Deployment Guide
See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed steps.

---

## 🧪 Testing

### Local Testing Checklist
- [x] Backend server starts without errors
- [x] React frontend loads on port 3000
- [x] Database connection successful
- [x] Can create new projects
- [x] Can view all projects
- [x] Can update project status
- [x] Can delete projects
- [x] Data persists after page refresh
- [x] All CRUD operations work instantly

---

## 🔧 Troubleshooting

### Issue: "Cannot GET /api/projects"
**Cause**: Backend not running or wrong API URL
**Solution**: 
- Ensure `node server.js` is running
- Check `src/config.js` API URL is correct

### Issue: "ECONNREFUSED" error
**Cause**: Backend server not running
**Solution**: 
- Start backend: `cd "Orbilla - Lab Activity 7"; node server.js`

### Issue: "Database connection error"
**Cause**: Wrong MongoDB URI
**Solution**:
- Verify `.env` DATABASE_URL is correct
- Check MongoDB Atlas IP whitelist includes your IP

### Issue: Port already in use
**Cause**: Another process using port 3000 or 5000
**Solution**:
```powershell
# Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | This file - Quick start guide |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Step-by-step deployment instructions |
| [COMPLETION_CHECKLIST.md](COMPLETION_CHECKLIST.md) | Requirements completion tracking |
| [REQUIREMENTS_VERIFICATION.md](REQUIREMENTS_VERIFICATION.md) | Detailed verification with code references |

---

## 👨‍💻 Author

**Orbilla**  
CCC181 - Lab Activity Final  
Full Stack Integration: Complete CRUD and Deployment

---

## 📄 License

Educational Project - CCC181 Course

---

**Last Updated**: December 12, 2025  
**Status**: ✅ Complete & Ready for Deployment

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
