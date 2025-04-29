
# ArtisanLink Backend API

This is the backend API for the ArtisanLink platform, built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- User authentication (signup, login) with JWT
- Role-based authorization (artisan, buyer, admin)
- Product management with fair pricing system
- Storytelling features for cultural preservation
- Search functionality
- Clean and modular code structure

## Prerequisites

- Node.js v14+ installed
- MongoDB installed locally or a MongoDB Atlas account
- Git

## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory with the following variables:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/artisanlink
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d
```

4. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/update-me` - Update current user profile

### User Routes
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/artisans` - Get all artisans

### Product Routes
- `POST /api/products` - Create a product (artisan only)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product (owner or admin)
- `DELETE /api/products/:id` - Delete product (owner or admin)
- `POST /api/products/:id/fair-price` - Add fair price rating (buyer only)
- `GET /api/products/search/:query` - Search products

### Story Routes
- `POST /api/stories` - Create a story
- `GET /api/stories` - Get all stories
- `GET /api/stories/:id` - Get story by ID
- `PUT /api/stories/:id` - Update story (owner or admin)
- `DELETE /api/stories/:id` - Delete story (owner or admin)
- `GET /api/stories/cultural-tags/:tag` - Get stories by cultural tag
- `GET /api/stories/region/:regionName` - Get stories by region
- `GET /api/stories/search/:query` - Search stories

## Connecting to the Frontend

To connect this backend to your Vite + React + TypeScript frontend:

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Configure your frontend to make API calls to the backend:

Create an API service in your frontend project:

```typescript
// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

3. Create authentication services:

```typescript
// src/services/authService.ts
import api from './api';

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
```

4. Example of using the API in a React component:

```typescript
import { useState, useEffect } from 'react';
import { getArtisans } from '../services/userService';

const ArtisansPage = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const response = await getArtisans();
        setArtisans(response.data.artisans);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching artisans');
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  // Render component...
};
```

## Development Best Practices

1. Use environment variables for configuration
2. Always validate user input
3. Implement proper error handling
4. Follow RESTful API design principles
5. Write clean, modular, and reusable code
6. Implement proper authentication and authorization
7. Use middleware for cross-cutting concerns

## License

This project is licensed under the MIT License.
