"use client";

import { useState } from "react";
import { signUp } from "../lib/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function SignUpPage() {
  const router = useRouter();

  // Form State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    contact_no: "",
    street_name: "",
    city: "",
    province: "",
    postal_code: "",
    country: "",
    email: "",
    password: "",
    user_type: "customer",
  });
  const [error, setError] = useState<string | null>(null);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Move to the next step
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const {
        first_name,
        last_name,
        contact_no,
        street_name,
        city,
        province,
        postal_code,
        country,
        email,
        password,
      } = formData;

      // Register the user
      await signUp(email, password, {
        first_name,
        last_name,
        contact_no,
        street_name,
        city,
        province,
        postal_code: Number(postal_code),
        country,
        user_type: "customer",
      });

      // Redirect to login after successful signup
      router.push("/login");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
        <Navbar />
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Create an Account</h1>

        {/* Progress Bar */}
        <div className="flex mb-8">
          {["User Info", "Address", "Credentials"].map((label, index) => (
            <div key={index} className={`flex-1 text-center ${step === index + 1 ? "font-bold" : "text-gray-400"}`}>
              {label}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">User Information</h2>
              <Input label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
              <Input label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
              <Input label="Contact Number" name="contact_no" value={formData.contact_no} onChange={handleChange} />
              <NavigationButtons step={step} nextStep={nextStep} />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Address Information</h2>
              <Input label="Street Name" name="street_name" value={formData.street_name} onChange={handleChange} />
              <Input label="City" name="city" value={formData.city} onChange={handleChange} />
              <Input label="Province" name="province" value={formData.province} onChange={handleChange} />
              <Input label="Postal Code" name="postal_code" value={formData.postal_code} onChange={handleChange} />
              <Input label="Country" name="country" value={formData.country} onChange={handleChange} />
              <NavigationButtons step={step} nextStep={nextStep} prevStep={prevStep} />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Account Credentials</h2>
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
              <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <NavigationButtons step={step} prevStep={prevStep} isFinalStep />
            </>
          )}
        </form>
      </div>
    </div>
    </div>
  );
}

// Input Component
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full p-3 border rounded-md"
    />
  </div>
);

// Navigation Buttons Component
const NavigationButtons = ({
  step,
  nextStep,
  prevStep,
  isFinalStep = false,
}: {
  step: number;
  nextStep?: () => void;
  prevStep?: () => void;
  isFinalStep?: boolean;
}) => (
  <div className="mt-8 flex justify-between">
    {prevStep && step > 1 && (
      <button
        type="button"
        onClick={prevStep}
        className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md"
      >
        Back
      </button>
    )}
    {isFinalStep ? (
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-md"
      >
        Submit
      </button>
    ) : (
      <button
        type="button"
        onClick={nextStep}
        className="bg-black text-white px-6 py-2 rounded-md"
      >
        Next
      </button>
    )}
  </div>
);
