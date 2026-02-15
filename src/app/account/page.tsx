"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loader2, User, Mail, Calendar, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/button";

export default function AccountPage() {
  const { user, isLogin, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLogin) {
      router.push("/login");
    }
  }, [loading, isLogin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLogin) return null;

  return (
    <main className="flex justify-center min-h-screen py-20 px-4 mt-10 animate-fade-in">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            My Account
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your personal information and subscription
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          {/* Profile Card */}
          <Card className="p-6 flex flex-col items-center text-center space-y-4 h-fit">
            <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
              <User className="w-12 h-12 text-slate-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {user?.username || "Guest User"}
              </h2>
              <p className="text-sm text-slate-500">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <Badge variant="secondary" className="mt-2">
              Free Plan
            </Badge>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => logout()}
            >
              Log Out
            </Button>
          </Card>

          {/* Details */}
          <div className="space-y-6">
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Account Details
              </h3>

              <div className="space-y-4">
                <div className="grid gap-1">
                  <label className="text-sm font-medium text-slate-500">
                    Username
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">
                      {user?.username || "Not set"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-1">
                  <label className="text-sm font-medium text-slate-500">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">
                      {user?.email || "Not set"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-1">
                  <label className="text-sm font-medium text-slate-500">
                    Member Since
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">February 2026</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
