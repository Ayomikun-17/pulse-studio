# pulse-studio
Full-stack fitness studio web application built with React, Express and PostgreSQL
# Pulse Studio

A full-stack fitness studio web application designed to help users explore fitness services, view trainers, discover membership options, and access a personalised member area.

## About the Project

Pulse Studio is a web development project built using React for the frontend, Express.js for the backend, and PostgreSQL for data storage. The application includes user registration and login, session-based authentication, trainer data retrieval, and a protected member profile.

## Features

- **Modern frontend:** React and Vite.
- **Trainer information:** Retrieve trainer records from the database.
- **User registration:** Create a member account.
- **User authentication:** Log in and log out securely using server-side sessions.
- **Protected member area:** Restrict access to member pages for unauthenticated users.
- **Member profile:** Display information associated with the logged-in member.
- **PostgreSQL database:** Store application data using Neon PostgreSQL.
- **Responsive styling:** Tailwind CSS and custom CSS.

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development server |
| Tailwind CSS | Styling and layout |
| Node.js | JavaScript runtime |
| Express.js | Backend API |
| PostgreSQL | Relational database |
| Neon | Hosted PostgreSQL database |
| bcryptjs | Password hashing |
| express-session | Session-based authentication |
| connect-pg-simple | PostgreSQL session storage |
| Git and GitHub | Version control and project hosting |

## Project Structure

```text
pulse-studio/
├── server/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── .gitignore
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── MainContent.jsx
│   │   ├── ClassSchedule.jsx
│   │   ├── Membership.jsx
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── MemberProfile.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   └── MemberPage.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── package.json
├── .gitignore
└── README.md
```

*Note: The structure above highlights the main project files. Additional files and assets may exist in the repository.*

## Getting Started

### Prerequisites

Before running the project, install:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A Neon PostgreSQL database account

### 1. Clone the repository

```bash
git clone https://github.com/Ayomikun-17/pulse-studio.git
cd pulse-studio
```

### 2. Install frontend dependencies

Open a terminal in the main project folder and run:

```bash
npm install
```

### 3. Configure the backend

Open a second terminal and navigate to the backend folder:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder. Add your own database connection string and a securely generated session secret:

```env
DATABASE_URL=your_neon_database_connection_string
SESSION_SECRET=your_secure_random_secret
PORT=5000
```

Replace the example values with your actual credentials. Never commit your `.env` file or publish database credentials and session secrets on GitHub.

### 4. Start the backend

From the `server` folder, run:

```bash
npm run dev
```

The backend should run at:

`http://localhost:5000`

You can check the API using:

- Health check: `http://localhost:5000/api/health`
- Database check: `http://localhost:5000/api/db-test`
- Trainers: `http://localhost:5000/api/trainers`

The database check requires a valid database connection.

### 5. Start the frontend

Open another terminal in the main `pulse-studio` project folder and run:

```bash
npm run dev
```

Open the local address displayed by Vite in your browser, usually:

`http://localhost:5173`

Keep both the frontend and backend running while testing the application.

## Authentication and Database

Pulse Studio uses Express.js API routes to process authentication and retrieve application data. Passwords are hashed using bcryptjs, while express-session and PostgreSQL-backed session storage support authenticated sessions.

The backend connects to a PostgreSQL database hosted on Neon. A valid database connection and correctly configured environment variables are required for database-dependent features.

## Development Notes

- Run the frontend and backend in separate terminals.
- Keep environment variables in the backend `.env` file.
- Ensure the frontend origin is allowed by the backend CORS configuration.
- Use a strong, unique session secret.
- Do not publish passwords, API keys, or database connection strings.
- Confirm that all required database tables are created before testing database-dependent features.

## Future Improvements

Potential future enhancements include:

- Class booking and booking management.
- Member profile editing.
- Database-connected membership subscriptions.
- Additional member dashboard functionality.
- Automated testing and deployment.

## Author

**Ayomikun**

GitHub: [@Ayomikun-17](https://github.com/Ayomikun-17)

## Repository

[View Pulse Studio on GitHub](https://github.com/Ayomikun-17/pulse-studio)

---

*Pulse Studio is a learning and development project focused on full-stack web development, authentication, database integration, and user interface design.*
