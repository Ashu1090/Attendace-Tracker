# Attendance Management System

## Overview

The Attendance Management System is a web application designed to help colleges manage student attendance efficiently. It provides an Admin Panel where administrators can manage students and track attendance records.

## Features

- User authentication using JWT (JSON Web Token)
- Admin Dashboard to manage students and attendance
- Attendance tracking and reporting
- Responsive UI with Tailwind CSS and Material UI
- Secure REST API with Node.js and Express.js
- MySQL database for storing user and attendance records

## Technologies Used

### Frontend (Vite + React)

- **React.js** (with Vite for faster development)
- **Tailwind CSS** (for responsive design)
- **Material UI** (for modern UI components)
- **React Router** (for navigation)

### Backend (Node.js + Express.js)

- **Express.js** (for handling API requests)
- **MySQL** (as the relational database)
- **Sequelize** (ORM for MySQL)
- **JWT Authentication** (for secure login sessions)

## Screenshots

###Home page
![Image](https://github.com/user-attachments/assets/7b41064c-dffa-4eb6-a68e-4fa2daae376f)
###About
![Image](https://github.com/user-attachments/assets/95d530b1-7fcd-4eba-97e1-f155c46e111a)
###Help
![Image](https://github.com/user-attachments/assets/c2870c7c-a909-49c1-9f5d-3b4f6f5526c1)
###Login
![Image](https://github.com/user-attachments/assets/8f862b17-b01f-4ae4-929b-c271b2654abc)
###Admin dashboard
![Image](https://github.com/user-attachments/assets/82b3c688-5049-4827-b386-b8dc9f9c4cc3)
###Attendace
![Image](https://github.com/user-attachments/assets/2dd6e93c-94bb-4ec7-917a-ab90b5b8a7d9)
###Studentlist

###Report

###Student dashboard

###Timetable

###Manual

## Installation & Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/yourusername/attendance-management-system.git
cd attendance-management-system
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following:
   ```env
   PORT=5000
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```
4. Run the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Students

- `GET /api/students` - Get all students
- `POST /api/students` - Add a student
- `DELETE /api/students/:id` - Remove a student

### Attendance

- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

## Author

This Project is made by Mohammed Ashiq !!!

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.

