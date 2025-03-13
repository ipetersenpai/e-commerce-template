// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, isSeller } from "../lib/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);

      // Check if user is a seller
      const seller = await isSeller();
      if (!seller) throw new Error("Access denied. Not a seller.");

      router.push("/admin/dashboard");
    } catch (err) {
      setError((err as Error).message || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-3 w-full border rounded-lg"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-3 w-full border rounded-lg"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-[#fefe00] text-black py-3 rounded-lg hover:bg-[#e6e600] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
