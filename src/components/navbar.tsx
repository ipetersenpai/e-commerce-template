"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isCustomer,logOut } from "@/app/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      const customer = await isCustomer();
      setIsLoggedIn(customer);
    };
    checkAuth();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  // Navbar links (shown to all users)
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about-us", label: "About Us" },
  ];

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <Image src="/images/logo.png" alt="Logo" width={120} height={50} />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-yellow-500 ${
              pathname === link.href ? "text-yellow-500 font-semibold" : "text-gray-800"
            }`}
          >
            {link.label}
          </Link>
        ))}

        {/* Cart (Visible only if logged in) */}
        {isLoggedIn && (
          <Link
            href="/cart"
            className={`hover:text-yellow-500 ${
              pathname === "/cart" ? "text-yellow-500 font-semibold" : "text-gray-800"
            }`}
          >
            Cart
          </Link>
        )}

        {/* User Profile Icon with Dropdown (If logged in) */}
        {isLoggedIn ? (
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
              <Image
                src="/images/user-icon.png"
                alt="User"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 overflow-hidden z-50">
                <Link
                  href="/customer/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Login Link (If not logged in)
          <Link
            href="/login"
            className={`hover:text-yellow-500 ${
              pathname === "/login" ? "text-yellow-500 font-semibold" : "text-gray-800"
            }`}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
