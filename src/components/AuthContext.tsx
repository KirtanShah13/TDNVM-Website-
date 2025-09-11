import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (user: User, isAdmin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const admin = localStorage.getItem("isAdmin") === "true";
    const storedUser = localStorage.getItem("user");

    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const login = (userData: User, admin: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(admin);
    setUser(userData);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAdmin", admin ? "true" : "false");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
