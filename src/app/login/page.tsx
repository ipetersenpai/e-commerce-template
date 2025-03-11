import Navbar from "@/components/navbar";

export default function Login() {
  return (
    <div>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Login to STRIP.</h1>
        <p className="text-lg text-gray-600">Access your account and manage your orders.</p>
      </div>
    </div>
  );
}
