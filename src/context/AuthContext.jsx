
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_URL = "http://localhost:5000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check whether the user already has a valid session.
  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch(`${API_URL}/api/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user ?? null);
      } catch (error) {
        console.error("Session check failed:", error);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    checkSession();
  }, []);

  // Log in and update the user throughout the app.
  async function login(email, password) {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

    setUser(data.user);
    return data.user;
  }

  // Log out and clear the current user.
  async function logout() {
    const response = await fetch(`${API_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logout failed.");
    }

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, authLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
