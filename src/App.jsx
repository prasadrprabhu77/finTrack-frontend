import { useEffect } from "react";
import { getTheme, setTheme } from "./utils/theme";
import ThemeToggle from "./components/ThemeToggle";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute>
                                  <Dashboard />
                                </ProtectedRoute>} />
    </Routes>
  );
}

export default App;
