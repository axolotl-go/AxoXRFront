"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Button from "@/components/button";
import { Input } from "@/components/ui/input";
import { IsLogin, SignIn } from "@/services/login.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin, loading } = useAuth();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      await toast.promise(SignIn(form), {
        loading: "Iniciando sesión...",
        success: "Bienvenido",
        error: "Credenciales incorrectas",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && isLogin) {
      router.push("/dashboard");
    }
  }, [loading, isLogin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isLogin) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Header */}
        <header className="text-center mb-8 space-y-2">
          <h1 className="text-4xl font-black bg-linear-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Log in to manage your 3D assets
          </p>
        </header>

        {/* Form Card */}
        <div className="glass-panel p-8 rounded-2xl shadow-2xl shadow-primary/5">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Email Address
              </label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="name@example.com"
                className="bg-white/50 dark:bg-black/20"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a
                  className="text-xs text-primary hover:text-blue-500 transition-colors"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                  className="bg-white/50 dark:bg-black/20 pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full mt-4"
              isLoading={isLoading}
            >
              Log In
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          Do you dont have a account{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign Up
          </a>
        </p>

        <p className="text-center text-sm text-slate-500 mt-8">
          By clicking continue, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}
