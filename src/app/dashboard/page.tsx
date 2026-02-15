"use client";
import Button from "@/components/button";
import { ModelCard } from "@/components/model-card";
import { ArrowUp, Filter, Grid, List, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isLogin, loading } = useAuth();
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

  if (!isLogin) {
    return null;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 mt-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            My Models
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage and preview your 3D assets
          </p>
        </div>

        <Button
          variant="default"
          // href="/upload"
          className="shadow-lg shadow-primary/20 cursor-not-allowed"
        >
          <ArrowUp className="w-4 h-4 mr-2" /> Upload New
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["All Models", "Drafts", "Published"].map((f, i) => (
            <button
              key={f}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <Button variant="ghost" size="icon" className="w-9 h-9">
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-slate-600 dark:text-slate-300"
          >
            <List className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2" />
          <Button variant="ghost" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
    </main>
  );
}
