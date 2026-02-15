"use client";
import Button from "./button";
import { Box } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import data from "@/data/data.json";

const Nav = () => {
  const { isLogin, logout, loading } = useAuth();

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

        {!loading && (
          <div className="flex items-center gap-4">
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

                <Button
                  variant="default"
                  size="sm"
                  onClick={() => logout()}
                  className="rounded-full px-6"
                >
                  Log Out
                </Button>
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
      </div>
    </header>
  );
};

export default Nav;
