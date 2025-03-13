// src/app/admin/dashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { isSeller, logOut } from "../../lib/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const seller = await isSeller();
      if (!seller) {
        router.push("/admin");
      }
      setLoading(false);
    };
    checkAccess();
  }, [router]);

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <p>Welcome, Seller! Here you can manage your products.</p>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
