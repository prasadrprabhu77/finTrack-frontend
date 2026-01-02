import { Wallet } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setToken } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      setToken(res.data.token)
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
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
            Welcome back
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
            Login to your account
          </p>

          {/* Error */}
          {error && (
            <p className="text-sm text-expense text-center mb-4">
              {error}
            </p>
          )}

          {/* Form */}
          <div className="space-y-4">
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
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg font-medium
              hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-primary font-medium cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
