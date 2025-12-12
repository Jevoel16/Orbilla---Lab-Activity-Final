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

// Connect to the database
connectDB();

// ===========================
// READ Route - GET /api/projects
// ===========================
app.get('/api/projects', async (req, res) => {
  try {
    // Fetch all ProjectLog entries from the database
    const projects = await ProjectLog.find().sort({ createdAt: -1 });

    // Return the projects as JSON
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

// ===========================
// CREATE Route - POST /api/projects
// ===========================
app.post('/api/projects', async (req, res) => {
  try {
    // Extract data from request body
    const { title, description, status } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required fields',
      });
    }

    // Create a new ProjectLog entry
    const newProject = new ProjectLog({
      title,
      description,
      status: status || 'pending',
    });

    // Save to database
    const savedProject = await newProject.save();

    // Return 201 Created status with the new project
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

// ===========================
// UPDATE Route - PATCH /api/projects/:id
// ===========================
app.patch('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Validate that at least one field is provided
    if (!title && !description && !status) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (title, description, or status) is required for update',
      });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;

    // Find and update the project
    const updatedProject = await ProjectLog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Return updated doc and run schema validation
    );

    // Check if project exists
    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Return the updated project
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

// ===========================
// DELETE Route - DELETE /api/projects/:id
// ===========================
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the project
    const deletedProject = await ProjectLog.findByIdAndDelete(id);

    // Check if project exists
    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Return 204 No Content (successful deletion with no body)
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

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
