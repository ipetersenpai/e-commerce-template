// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn, isCustomer } from "../lib/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);

      // Check if user is a seller
      const seller = await isCustomer();
      if (!seller) throw new Error("Access denied. Not a Customer.");

      router.push("/");
    } catch (err) {
      setError((err as Error).message || "Login failed.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Login to STRIP.</h1>
        <p className="text-lg text-gray-600">Access your account and manage your orders.</p>

        <form onSubmit={handleLogin} className="mt-8 max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-md"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white w-full p-3 rounded-md hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
