"use client";

import { useState } from "react";
import Button from "./button";
import { Box, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import data from "@/data/data.json";
import { AnimatePresence, motion } from "motion/react";

const Nav = () => {
  const { isLogin, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-white/10 dark:border-white/5" />

      <div className="relative flex items-center justify-between px-6 py-4 md:px-10 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Box className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            AxoXR
          </h2>
        </Link>

        {/* Desktop Navigation */}
        {!loading && (
          <div className="hidden md:flex items-center gap-4">
            {isLogin ? (
              <>
                {data.nav.map((item: any) => (
                  <Button
                    key={item.link}
                    variant="ghost"
                    size="sm"
                    href={item.link}
                    className="rounded-full px-6"
                  >
                    {item.linkName}
                  </Button>
                ))}
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  href="/login"
                  className="rounded-full px-6"
                >
                  Log In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  href="/signup"
                  className="rounded-full px-6"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4 shadow-lg">
              {!loading && (
                <>
                  {isLogin ? (
                    <>
                      {data.nav.map((item: any) => (
                        <Link
                          key={item.link}
                          href={item.link}
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                        >
                          {item.linkName}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="px-4 py-3 rounded-lg text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                      >
                        Log In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 rounded-lg text-primary bg-primary/10 hover:bg-primary/20 transition-colors font-medium"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
