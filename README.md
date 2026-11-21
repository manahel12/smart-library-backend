Ye lijiye aapke backend ke liye ek **Professional aur Complete README.md** ka code. Aap isko copy karein aur apne `backend` folder mein `README.md` file bana kar paste kar dein.

```markdown
# Smart Library and Digital Resource Management System - Backend API

This is the backend RESTful API for the **Smart Library and Digital Resource Management System**. It is built using **Node.js**, **Express.js**, and **Microsoft SQL Server** (hosted on AWS RDS). This API handles authentication, book inventory, member management, digital resources, and book issue/return transactions.

## 🚀 Technologies Used
*   **Node.js & Express.js:** For building the server and RESTful API routes.
*   **Microsoft SQL Server (SSMS & AWS RDS):** Relational database management system hosted on the cloud.
*   **mssql:** Node.js driver for connecting to SQL Server.
*   **JWT (JSON Web Tokens) & bcryptjs:** For secure user authentication and password hashing.
*   **dotenv:** For managing environment variables securely.
*   **CORS:** For enabling cross-origin requests between the frontend and backend.

## 📂 Project Structure
```text
backend/
├── controllers/      # Business logic for routes
├── middleware/       # Authentication middleware (JWT verification)
├── routes/           # Express route definitions
├── db.js             # SQL Server database connection pool
├── server.js         # Main entry point of the application
├── .env              # Environment variables (not pushed to GitHub)
└── package.json      # Project dependencies and scripts
```

## ⚙️ How to Run Locally

Follow these steps to run the backend server on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manahel12/smart-library-backend.git
   cd smart-library-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following credentials (replace with your actual database details):
   ```env
   PORT=5000
   DB_SERVER=your-aws-endpoint.amazonaws.com
   DB_DATABASE=SmartLibraryDB
   DB_USER=admin
   DB_PASSWORD=your_password
   DB_PORT=1433
   JWT_SECRET=your_secret_key
   ```

4. **Start the server:**
   For development (using nodemon):
   ```bash
   npm run dev
   ```
   For production:
   ```bash
   npm start
   ```

## 🌐 API Endpoints

### Authentication
*   `POST /api/auth/register` - Register a new librarian/admin
*   `POST /api/auth/login` - Authenticate and receive a JWT token

### Books
*   `GET /api/books` - Fetch all books with author and category details
*   `GET /api/books/search?query=...` - Search books by title, author, or category
*   `POST /api/books` - Add a new book to the inventory
*   `DELETE /api/books/:id` - Delete a book

### Members
*   `GET /api/members` - Fetch all registered members
*   `POST /api/members` - Add a new member

### Issue & Return
*   `POST /api/issues/issue` - Issue a book to a member
*   `POST /api/issues/return` - Return a book
*   `GET /api/issues/active` - Get a list of currently issued books

### Dashboard
*   `GET /api/dashboard` - Get statistics (total books, issued books, members, overdue)
*   `GET /api/dashboard/activity` - Get recent library activity

### Digital Resources
*   `GET /api/resources` - Fetch all digital resources
*   `POST /api/resources` - Add a new digital resource

## ☁️ Deployment
*   **Backend Server:** Deployed on **Vercel**.
*   **Database:** Hosted on **AWS RDS (Microsoft SQL Server)**.

## 📝 License
This project is developed for academic purposes as part of the Database Management System (DBMS) Lab.
```

