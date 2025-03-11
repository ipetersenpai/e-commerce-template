import Navbar from "@/components/navbar";

export default function Products() {
  return (
    <div>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-gray-600">Explore our diverse range of high-quality products.</p>
      </div>
    </div>
  );
}
