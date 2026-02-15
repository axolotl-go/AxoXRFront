"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loader2, Moon, Sun, Bell, Shield, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Button from "@/components/button";
import { useTheme } from "next-themes";

export default function ConfigPage() {
  const { isLogin, loading } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mock settings state for other items
  const [settings, setSettings] = useState({
    emailNotifications: true,
    publicProfile: false,
    twoFactor: false,
  });

  useEffect(() => {
    setMounted(true);
    if (!loading && !isLogin) {
      router.push("/login");
    }
  }, [loading, isLogin, router]);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLogin) return null;

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isDarkMode = theme === "dark";

  return (
    <main className="flex justify-center min-h-screen py-20 px-4 mt-10 animate-fade-in">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Customize your experience and security preferences
          </p>
        </header>

        <div className="grid gap-6">
          {/* Appearance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sun className="w-5 h-5" /> Appearance
            </h3>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Dark Mode
                </p>
                <p className="text-sm text-slate-500">Toggle dark theme</p>
              </div>
              <SimpleSwitch
                checked={isDarkMode}
                onChange={() => setTheme(isDarkMode ? "light" : "dark")}
              />
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" /> Notifications
            </h3>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Email Newsletters
                </p>
                <p className="text-sm text-slate-500">
                  Receive updates about new features
                </p>
              </div>
              <SimpleSwitch
                checked={settings.emailNotifications}
                onChange={() => toggleSetting("emailNotifications")}
              />
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Privacy & Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Public Profile
                  </p>
                  <p className="text-sm text-slate-500">
                    Allow others to see your models
                  </p>
                </div>
                <SimpleSwitch
                  checked={settings.publicProfile}
                  onChange={() => toggleSetting("publicProfile")}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Two-Factor Auth
                  </p>
                  <p className="text-sm text-slate-500">
                    Add an extra layer of security
                  </p>
                </div>
                <SimpleSwitch
                  checked={settings.twoFactor}
                  onChange={() => toggleSetting("twoFactor")}
                />
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

function SimpleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${
        checked ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
