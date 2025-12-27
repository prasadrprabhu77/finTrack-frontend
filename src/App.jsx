import { useEffect } from "react";
import { getTheme, setTheme } from "./utils/theme";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-3xl font-bold text-primary pt-10">
        FinTrack
      </h1>
    </div>
  );
}

export default App;
