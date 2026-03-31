import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "receptionist";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("hms_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setLoading(true);
    // Mock login — replace with real API call
    await new Promise((r) => setTimeout(r, 500));
    const mockUser: User = {
      id: "U001",
      name: "Admin User",
      email,
      role: "admin",
    };
    localStorage.setItem("hms_user", JSON.stringify(mockUser));
    localStorage.setItem("hms_token", "mock-jwt-token");
    setUser(mockUser);
    setLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("hms_user");
    localStorage.removeItem("hms_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
