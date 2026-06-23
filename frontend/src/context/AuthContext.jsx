import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// 🔥 API BASE URL (important)
const API = "http://18.209.47.148:5000";  // 🔥 PORT ADD KAR

const login = async (email, password, role) => {
  const res = await axios.post(`${API}/api/auth/login`, {
    email,
    password,
    role,
  });
  return res.data;
};

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