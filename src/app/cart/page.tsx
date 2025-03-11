import Navbar from "@/components/navbar";

export default function Cart() {
  return (
    <div>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        <p className="text-lg text-gray-600">View the items you want to purchase.</p>
      </div>
    </div>
  );
}
