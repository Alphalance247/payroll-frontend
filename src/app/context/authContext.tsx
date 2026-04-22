"use client";
import { useRouter } from "next/navigation";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  email: string;
  fullname: string;
  is_payroll_staff: boolean;
  uid: number;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  logout: () => Promise<void>;
  login: (userData: User) => void;
  isTokenExpired: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Read user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);

    // Add event listener for token expiration
    const handleTokenExpired = () => {
      setIsTokenExpired(true);
      // Automatically logout after 5 seconds
      setTimeout(() => {
        logout();
      }, 1000);
    };

    window.addEventListener("tokenExpired", handleTokenExpired);

    // Cleanup
    return () => {
      window.removeEventListener("tokenExpired", handleTokenExpired);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      // Add a small delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 3000));
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isLoggingOut,
        logout,
        login,
        isTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
