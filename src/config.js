// API Configuration for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL || 
                     (process.env.NODE_ENV === 'production' 
                      ? 'https://your-backend-url.onrender.com'  // Replace with actual deployed backend URL
                      : 'http://localhost:5000') || 
                      process.env.REACT_APP_API_URL1 || 
                      process.env.REACT_APP_API_URL2;

export const API_ENDPOINTS = {
    PROJECTS: `${API_BASE_URL}/api/projects`,
    PROJECT_BY_ID: (id) => `${API_BASE_URL}/api/projects/${id}`,
};

export default API_BASE_URL;
