import { Routes, Route } from "react-router-dom";
import CarLoanCalculator from "@/pages/CarLoanCalculator";
import About from "@/pages/About";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<CarLoanCalculator />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AuthContext.Provider>
  );
}
