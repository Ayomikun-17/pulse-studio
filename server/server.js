
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

require("dotenv").config();

const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------------------------------------
// 1. ENVIRONMENT CHECK
// --------------------------------------------------

if (!process.env.SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET is missing from the server/.env file."
  );
}

// --------------------------------------------------
// 2. MIDDLEWARE
// --------------------------------------------------

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    store: new pgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Local HTTP development only
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// --------------------------------------------------
// 3. AUTHENTICATION MIDDLEWARE
// --------------------------------------------------

function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Please log in to access this resource.",
    });
  }

  next();
}

// --------------------------------------------------
// 4. HEALTH CHECK (PUBLIC)
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Pulse Studio API is running!",
  });
});

// --------------------------------------------------
// 5. GET TRAINERS (PUBLIC)
// --------------------------------------------------

app.get("/api/trainers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM trainers ORDER BY id"
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch trainers:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not load trainers.",
    });
  }
});

// --------------------------------------------------
// 6. TEST DATABASE CONNECTION
// --------------------------------------------------

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    return res.json({
      success: true,
      message: "Pulse Studio database connected!",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error(
      "Database connection failed:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

// --------------------------------------------------
// 7. REGISTER A NEW USER
// --------------------------------------------------

app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body || {};

    if (
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !fullName.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name, email and password.",
      });
    }

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Your name must be 100 characters or fewer.",
      });
    }

    if (
      cleanEmail.length > 255 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // bcrypt supports passwords up to 72 bytes.
    if (
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and no more than 72 bytes.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, full_name, email, created_at`,
      [cleanName, cleanEmail, passwordHash]
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    console.error("Registration failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not create your account.",
    });
  }
});

// --------------------------------------------------
// 8. LOG IN
// --------------------------------------------------

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email and password.",
      });
    }

    const result = await pool.query(
      `SELECT id, full_name, email, password_hash
       FROM users
       WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    const user = result.rows[0];

    if (
      !user ||
      !(await bcrypt.compare(password, user.password_hash))
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Create a fresh session after successful login.
    req.session.regenerate((err) => {
      if (err) {
        console.error("Session creation failed:", err.message);

        return res.status(500).json({
          success: false,
          message: "Could not start your session.",
        });
      }

      req.session.user = {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
      };

      req.session.save((saveError) => {
        if (saveError) {
          console.error(
            "Session save failed:",
            saveError.message
          );

          return res.status(500).json({
            success: false,
            message: "Could not save your session.",
          });
        }

        return res.json({
          success: true,
          message: "Login successful!",
          user: req.session.user,
        });
      });
    });
  } catch (error) {
    console.error("Login failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Could not log in. Please try again.",
    });
  }
});

// --------------------------------------------------
// 9. CHECK CURRENT LOGIN SESSION
// --------------------------------------------------

app.get("/api/me", requireAuth, (req, res) => {
  return res.json({
    success: true,
    user: req.session.user,
  });
});

// --------------------------------------------------
// 10. GET MEMBER PROFILE FROM DATABASE (PROTECTED)
// --------------------------------------------------

app.get("/api/member", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, created_at
       FROM users
       WHERE id = $1`,
      [req.session.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found.",
      });
    }

    return res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(
      "Failed to fetch member:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Could not load member profile.",
    });
  }
});

// --------------------------------------------------
// 11. TEMPORARY PROTECTED API TEST
// --------------------------------------------------

app.get("/api/protected-test", requireAuth, (req, res) => {
  return res.json({
    success: true,
    message: "You have accessed a protected API route.",
    user: req.session.user,
  });
});

// --------------------------------------------------
// 12. LOG OUT
// --------------------------------------------------

app.post("/api/logout", (req, res) => {
  if (!req.session) {
    return res.json({
      success: true,
      message: "Logged out successfully.",
    });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Logout failed:", err.message);

      return res.status(500).json({
        success: false,
        message: "Could not log out.",
      });
    }

    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      success: true,
      message: "Logged out successfully.",
    });
  });
});

// --------------------------------------------------
// 13. START SERVER
// --------------------------------------------------

app.listen(PORT, () => {
  console.log(
    `Pulse Studio API running at http://localhost:${PORT}`
  );
});

