import { Wallet, Sun, Moon } from "lucide-react";
import { setTheme, getTheme } from "../utils/theme";
import { useState } from "react";

const ThemeToggle = () => {
  const [theme, setCurrentTheme] = useState(getTheme());

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
