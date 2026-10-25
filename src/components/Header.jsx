
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const { user, authLoading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      // Log out and clear the authentication state.
      await logout();

      // Navigate back to the homepage.
      navigate("/", { replace: true });

      // Return to the top of the page.
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Logout failed:", error);

      alert("Unable to log out. Please try again.");
    }
  }

  return (
    <header className="bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        {/* Pulse Studio logo */}
        <Link
          to="/#home"
          onClick={() => window.scrollTo(0, 0)}
          className="text-2xl font-black tracking-tight"
        >
          PULSE<span className="text-lime-400">.</span>
        </Link>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm sm:gap-x-6">
          <Link to="/#home" className="hover:text-lime-400">
            Home
          </Link>

          <Link to="/#trainers" className="hover:text-lime-400">
            Trainers
          </Link>

          <Link to="/#membership" className="hover:text-lime-400">
            Membership
          </Link>

          <Link to="/#contact" className="hover:text-lime-400">
            Contact
          </Link>

          {/* Member profile */}
          {!authLoading && user && (
            <Link
              to="/member"
              className="hover:text-lime-400"
            >
              Member Profile
            </Link>
          )}

          {/* User account controls */}
          {!authLoading && user && (
            <>
              <span className="font-semibold text-lime-400">
                Hi,{" "}
                {user.fullName ||
                  user.full_name ||
                  user.name ||
                  user.email}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-lime-400 px-4 py-2 font-semibold text-lime-400 transition hover:bg-lime-400 hover:text-slate-950"
              >
                Logout
              </button>
            </>
          )}

          {/* Login link for logged-out users */}
          {!authLoading && !user && (
            <Link
              to="/login"
              className="rounded-lg border border-lime-400 px-4 py-2 font-semibold text-lime-400 transition hover:bg-lime-400 hover:text-slate-950"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
