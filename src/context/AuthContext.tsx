"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  IsLogin as CheckLoginService,
  SignOut,
} from "@/services/login.service";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  loading: boolean;
  isLogin: boolean;
  logout: (redirectPath?: string) => Promise<void>;
  checkLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const res = await CheckLoginService();
      if (res) {
        setUser(res);
        setIsLogin(true);
      } else {
        setUser(null);
        setIsLogin(false);
      }
    } catch (error) {
      setUser(null);
      setIsLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (redirectPath = "/login") => {
    try {
      await SignOut();
      setUser(null);
      setIsLogin(false);
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isLogin, logout, checkLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
