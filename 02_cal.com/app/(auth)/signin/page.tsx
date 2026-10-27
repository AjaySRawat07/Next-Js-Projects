"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";


const Signin = () => {
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const route = useRouter();

  const enableButton =
    value.username.length > 4 &&
    emailRegex.test(value.email) &&
    value.password.length >= 4;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", {
        username: value.username,
        email: value.email,
        password: value.password,
      });
      
      if(response.status === 200 || response.status === 201){
      setValue({ username: "", email: "", password: "" });
      toast.success("Account created! Please check your email.");
        route.push("/login")
      }
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Signup failed");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-zinc-950 text-zinc-100 px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-6">
          Let&apos;s explore our website
        </h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="Username" className="text-sm text-zinc-400">
              Username
            </label>
            <input
              id="Username"
              type="text"
              placeholder="johndoe"
              value={value.username}
              onChange={(e) => setValue({ ...value, username: e.target.value })}
              className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              placeholder="xxxxx"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!enableButton}
            className="mt-2 py-2.5 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;