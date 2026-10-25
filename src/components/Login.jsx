
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setIsSuccess(false);
    setIsLoading(true);

    try {
      const user = await login(
        formData.email,
        formData.password
      );

      setIsSuccess(true);
      setMessage(
        `Welcome back, ${
          user.fullName ||
          user.full_name ||
          user.name ||
          user.email
        }!`
      );

      setFormData({
        email: "",
        password: "",
      });

      // Redirect to the protected member profile.
      navigate("/member");
    } catch (error) {
      setIsSuccess(false);
      setMessage(
        error.message || "Unable to connect to the server."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      style={{
        maxWidth: "420px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "12px",
        backgroundColor: "#f5f5f5",
        color: "#222",
      }}
    >
      <h2>Login to Pulse Studio</h2>
      <p>Welcome back! Enter your account details below.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="login-email">
            Email address
          </label>

          <input
            id="login-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
            style={{
              display: "block",
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginTop: "6px",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="login-password">
            Password
          </label>

          <input
            id="login-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            style={{
              display: "block",
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              marginTop: "6px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px",
            cursor: isLoading ? "wait" : "pointer",
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && (
        <p
          role="status"
          style={{
            marginTop: "16px",
            color: isSuccess ? "green" : "crimson",
          }}
        >
          {message}
        </p>
      )}
    </section>
  );
}

export default Login;
