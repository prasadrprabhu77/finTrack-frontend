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
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-cardDark border-b border-slate-200 dark:border-slate-700 z-20">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Wallet className="text-primary" size={28} />
          <span className="font-bold text-xl md:text-2xl">FinTrack</span>
        </div>

        {/* Links */}
        <div className="
      flex items-center gap-4 md:gap-12
      overflow-x-auto md:overflow-visible
      scrollbar-hide
      whitespace-nowrap
    ">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm md:text-md font-medium ${isActive
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
              `text-sm md:text-md font-medium ${isActive
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
              `text-sm md:text-md font-medium ${isActive
                ? "text-primary"
                : "text-slate-600 dark:text-slate-300"
              }`
            }
          >
            Budget
          </NavLink>

          {/* Theme Toggle */}
          <div className="scale-90 md:scale-100">
            <ThemeToggle />
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs md:text-sm text-expense p-1 rounded-md hover:bg-red-200"
          >
            <LogOut size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
