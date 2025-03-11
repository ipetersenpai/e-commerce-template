// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Navbar links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about-us", label: "About Us" },
    { href: "/cart", label: "Cart" },
    { href: "/login", label: "Login" },
  ];

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
      <Image src="/images/logo.png" alt="Logo" width={120} height={50} />
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6">
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
      </div>
    </nav>
  );
}
