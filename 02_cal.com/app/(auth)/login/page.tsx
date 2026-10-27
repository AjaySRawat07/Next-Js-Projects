"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const enableButton =
    emailRegex.test(value.email.trim()) && value.password.length >= 4;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting login for:", value.email);

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", {
        email: value.email.trim(),
        password: value.password,
      });

      console.log("Login response:", response.status, response.data);

      if (response.status === 200 || response.status === 201 || response.data?.success) {
        toast.success("Logged in successfully!");
        // Small delay so you can see the success toast before navigating
        setTimeout(() => {
          router.push("/profile");
        }, 800);
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        const backendError =
          error.response?.data?.error ||
          error.response?.data?.message ||
          `Request failed (${error.response?.status})`;
        toast.error(backendError);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-zinc-950 text-zinc-100 px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-6">
          {loading ? "Signing in..." : "Welcome back"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-zinc-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-zinc-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={!enableButton || loading}
            className="mt-2 py-2.5 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Log in"}
          </button>
        </form>

        <p className="text-sm text-zinc-400 text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;