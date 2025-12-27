import { useEffect } from "react";
import { getTheme, setTheme } from "./utils/theme";
import ThemeToggle from "./components/ThemeToggle";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
     <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>} />
     </Routes>
  );
}

export default App;
