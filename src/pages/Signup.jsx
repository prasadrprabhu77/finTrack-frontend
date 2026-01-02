import { Wallet } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      // redirect to login after successful signup
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-bgLight dark:bg-bgDark px-4">
        <div className="w-full max-w-md bg-white dark:bg-cardDark rounded-xl shadow-md p-6">
          
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Wallet className="text-primary" size={28} />
            <h1 className="text-2xl font-bold">FinTrack</h1>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-semibold text-center mb-1">
            Create account
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
            Sign up to start tracking your finances
          </p>

          {/* Error */}
          {error && (
            <p className="text-sm text-expense text-center mb-4">
              {error}
            </p>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 border rounded-lg outline-none
                border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border rounded-lg outline-none
                border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border rounded-lg outline-none
                border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg font-medium
              hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-primary font-medium cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
