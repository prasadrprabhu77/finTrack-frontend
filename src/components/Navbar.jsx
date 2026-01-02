import { Wallet, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { removeToken } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-cardDark border-b border-slate-200 dark:border-slate-700 z-20">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Wallet className="text-primary" size={24} />
          <span className="font-bold text-lg">FinTrack</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-primary"
                  : "text-slate-600 dark:text-slate-300"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-primary"
                  : "text-slate-600 dark:text-slate-300"
              }`
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/budget"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive
                  ? "text-primary"
                  : "text-slate-600 dark:text-slate-300"
              }`
            }
          >
            Budget
          </NavLink>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-expense hover:opacity-80"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
