"use client";
import Button from "./button";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
import { IsLogin, SignOut } from "@/services/login.service";

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await IsLogin();
        if (res) {
          setIsLogin(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await SignOut();
      if (res) {
        setIsLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-white/10 dark:border-white/5" />

      <div className="relative flex items-center justify-between px-6 py-4 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" href="/" className="rounded-full">
            <Box className="w-6 h-6 text-primary" />
          </Button>

          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            AxoXR
          </h2>
        </div>

        {isLogin ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm font-medium text-slate-500 dark:text-slate-400">
              Don’t have an account?
            </span>

            <Button
              variant="default"
              size="sm"
              onClick={handleLogout}
              className="rounded-full px-6"
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm font-medium text-slate-500 dark:text-slate-400">
              Don’t have an account?
            </span>

            <Button
              variant="default"
              size="sm"
              href="/login"
              className="rounded-full px-6"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;
