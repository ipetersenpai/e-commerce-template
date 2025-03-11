import Navbar from "@/components/navbar";

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">About STRIP.</h1>
        <p className="text-lg text-gray-600">
          We provide quality products in fashion, perfumes, and more. Your satisfaction is our priority.
        </p>
      </div>
    </div>
  );
}
