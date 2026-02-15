"use client";

import { useState, useEffect } from "react";
import {
  IsLogin as CheckLoginService,
  SignOut,
} from "@/services/login.service";
import { useRouter } from "next/navigation";

export function useAuth() {
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

  return { user, isLogin, loading, logout, checkLogin };
}
