
import { useState } from "react";

const API_URL = "http://localhost:5000/api/register";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
     const response = await fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    password: formData.password,
  }),
});

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      setMessage(
        "Account created successfully! You can now continue to login when we add that feature."
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="register"
      className="bg-slate-100 px-5 py-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime-700">
          Join Pulse Studio
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Create your account
        </h2>

        <p className="mt-2 text-slate-600">
          Register to get started with your fitness journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Full name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              maxLength={100}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={255}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              maxLength={72}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              placeholder="At least 8 characters"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={8}
              maxLength={72}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-200"
              placeholder="Enter your password again"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {message && (
            <p
              role="status"
              className="rounded-lg bg-lime-50 p-3 text-sm text-green-800"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-lime-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
}
