# Full-Stack Task Management System (Intern Assignment)

A secure, scalable REST API and modern React frontend built for managing tasks with role-based access control.

## 🚀 Features

### Backend
- **Authentication**: User registration and login with JWT and Bcrypt hashing.
- **RBAC**: Role-based access control (User vs. Admin).
- **CRUD Operations**: Secure endpoints for managing tasks (Title, Description, Status).
- **Security**: Helmet for headers, CORS enabled, Joi for input validation.
- **Documentation**: Interactive API documentation using Swagger UI.
- **Error Handling**: Centralized middleware for clean error responses.

### Frontend
- **Design**: Premium glassmorphism UI with dark mode.
- **State Management**: React Context API for Global Auth state.
- **Routing**: Protected routes ensuring only logged-in users access the dashboard.
- **Interactions**: Real-time CRUD updates, modal-based editing, and responsive layout.

---

## 🛠 Tech Stack
- **Frontend**: React (Vite), Axios, Lucide React, CSS3.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Swagger.

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (copied from `.env.example` if provided):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/intern-assignment
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=24h
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. API Docs: Visit `http://localhost:5000/api-docs`

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the app: `http://localhost:5173`

---

## 📚 API Endpoints

### Auth
- `POST /api/v1/auth/register` - Create a new user
- `POST /api/v1/auth/login` - Authenticate user & get token
- `GET /api/v1/auth/me` - Get current user profile (Protected)

### Tasks
- `GET /api/v1/tasks` - Get tasks (Admin: All, User: Own) (Protected)
- `POST /api/v1/tasks` - Create a task (Protected)
- `PUT /api/v1/tasks/:id` - Update a task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete a task (Protected)

---

## 📊 Scalability Note
See [SCALABILITY.md](./SCALABILITY.md) for detailed thoughts on scaling this application.
