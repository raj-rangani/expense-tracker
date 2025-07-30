# Expense Tracker

A full-stack expense tracking application built with React, TypeScript, Node.js, and MySQL. Track your expenses, view statistics, and manage your financial data with an intuitive interface.

## 🚀 Features

- **Expense Management**: Add, edit, and delete expenses with categories
- **Dashboard**: Overview of recent expenses and quick actions
- **Statistics**: Detailed analytics with insights
- **Category Management**: Organize expenses by categories
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Real-time Data**: Live updates with Redux state management

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Day.js** for date handling
- **Vite** for build tooling

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **MySQL** database
- **Zod** for validation
- **CORS** and **Helmet** for security
- **Nodemon** for development

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **pnpm** (recommended) or npm

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/raj-rangani/expense-tracker.git
cd expense-tracker
```

### 2. Database Setup

1. **Install MySQL** if you haven't already
2. **Create the database** by running the schema:

```bash
mysql -u your_username -p < database/schema.sql
```

3. **Create environment file** for the server:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=expense_tracker
PORT=3000
```

### 3. Install Dependencies

```bash
# Install server dependencies
cd server
pnpm install

# Install client dependencies
cd ../client
pnpm install
```

### 4. Configure Frontend Server URL

The frontend is configured to connect to the backend API. You may need to update the API base URL in the frontend configuration:

1. **Check the current API configuration** in `client/src/services/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:5001/api";
```

2. **Update the API base URL** if your server is running on a different port:

```typescript
const API_BASE_URL = "http://localhost:3000/api"; // Default server port
```

### 5. Start the Application

#### Start the Backend Server

```bash
cd server
pnpm dev
```

The server will start on `http://localhost:3000`

#### Start the Frontend Development Server

```bash
cd client
pnpm dev
```

The client will start on `http://localhost:5173`

## 📁 Project Structure

```
expense-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Expenses/   # Expense-related components
│   │   │   ├── Layout/     # Layout components
│   │   │   └── Statistics/ # Chart components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   └── store/          # Redux store and slices
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── configs/        # Database configuration
│   │   ├── middlewares/    # Express middlewares
│   │   ├── routes/         # API route handlers
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── validators/     # Request validation
│   └── package.json
└── database/               # Database schema and migrations
    └── schema.sql
```

## 📊 API Endpoints

### Users

- `GET /api/users` - Get all users

### Categories

- `GET /api/categories` - Get all categories

### Expenses

- `GET /api/expenses` - Get expenses with filters
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Statistics

- `GET /api/statistics/monthly-change` - Monthly change statistics
- `GET /api/statistics/predictions` - Expense predictions
- `GET /api/statistics/top-days` - Top spending days

## 🎨 Features Overview

### Dashboard

- Overview of recent expenses
- Quick expense entry
- Category-based expense filtering
- Expense list with edit/delete actions

### Statistics

- Monthly change statistics
- Expense predictions
- Top spending days analysis
- Interactive charts and visualizations

### Expense Management

- Add new expenses with categories
- Edit existing expenses
- Delete expenses
- Filter by date, category, and user
- Search functionality

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Verify MySQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**

   - Change port in `.env` file
   - Kill existing processes on the port

3. **API Connection Issues**

   - Verify the server is running on the correct port
   - Check that the frontend API base URL matches the server port
   - Ensure CORS is properly configured on the server
   - Check browser console for network errors

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

### Development Tips

- Use `pnpm` for faster package management
- Enable TypeScript strict mode for better type safety
- Use ESLint for code quality
- Test API endpoints with tools like Postman

---

**Happy Expense Tracking! 💰**
