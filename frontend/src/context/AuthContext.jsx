import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// 🔥 API BASE URL (important)
const API = "http://18.209.47.148";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔥 LOGIN FUNCTION
  const login = async (email, password, role) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
        role,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      setUser(res.data.user);

      return res.data;
    } catch (err) {
      throw err.response?.data || { error: "Login failed" };
    }
  };

  // 🔥 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 CUSTOM HOOK
export const useAuth = () => useContext(AuthContext);