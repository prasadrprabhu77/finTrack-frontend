import { Wallet } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const Signup = () => {
  return (
    <div className="relative min-h-screen">
      {/* Dark Mode Toggle – Top Right */}
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

          {/* Form */}
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
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
                placeholder="••••••••"
                className="w-full px-3 py-2 border rounded-lg outline-none
                border-slate-300 dark:border-slate-600
                bg-white dark:bg-slate-800
                focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Button */}
            <button
              type="button"
              className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <span className="text-primary font-medium cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
