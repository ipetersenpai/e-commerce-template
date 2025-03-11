// src/app/page.tsx
import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8 bg-gradient-to-r from-yellow-50 to-yellow-100">
        <h1 className="text-5xl font-bold mb-6">Welcome to STRIP.</h1>
        <p className="text-lg mb-8 text-gray-700">
          Discover the latest trends in fashion, perfumes, accessories, and shoes.
        </p>
        <a
          href="/products"
          className="bg-[#fefe00] text-black px-6 py-3 rounded-lg text-lg hover:bg-yellow-400 transition"
        >
          Shop Now
        </a>
      </section>

      {/* Featured Products */}
      <section className="p-8">
        <h2 className="text-3xl font-semibold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Example Product */}
          <div className="border rounded-lg p-4 hover:shadow-lg">
            <Image src="/product-1.jpg" alt="Product 1" width={300} height={300} />
            <h3 className="text-xl font-medium mt-4">Stylish Sneakers</h3>
            <p className="text-gray-600 mt-2">$59.99</p>
            <a
              href="/products"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              View Details
            </a>
          </div>
          {/* Repeat this block for more products */}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-6 bg-gray-100 mt-12">
        &copy; {new Date().getFullYear()} STRIP. All Rights Reserved.
      </footer>
    </div>
  );
}
