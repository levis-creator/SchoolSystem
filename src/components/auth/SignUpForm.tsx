"use client"
import React, { useState } from "react";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { AuthResponse } from "@/lib/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const router = useRouter();
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone number must be at least 10 characters";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase, one lowercase, one number, and one special character";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords must match";
    }

    if (!formData.terms) newErrors.terms = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result: AuthResponse = await res.json();
      if (!result.success) {
        toast.error(result.message)
      } else {
        toast.success(result.message)
        router.push("/signin")
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ChevronLeftIcon />
          Back to home
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">Sign Up</h1>
        <p className="text-sm text-gray-500">Enter your email and password to sign up!</p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label>First Name<span className="text-error-500">*</span></Label>
                <Input name="firstName" placeholder="Enter your first name" onChange={handleChange} />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>
              <div>
                <Label>Last Name<span className="text-error-500">*</span></Label>
                <Input name="lastName" placeholder="Enter your last name" onChange={handleChange} />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <Label>Email<span className="text-error-500">*</span></Label>
              <Input name="email" placeholder="Enter your email" onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <Label>Phone Number<span className="text-error-500">*</span></Label>
              <Input name="phoneNumber" placeholder="Enter your phone number" onChange={handleChange} />
              {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
            </div>
            <div>
              <Label>Password<span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 cursor-pointer">
                  {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div>
              <Label>Confirm Password<span className="text-error-500">*</span></Label>
              <Input name="confirmPassword" type="password" placeholder="Confirm your password" onChange={handleChange} />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
            <div className="flex items-center gap-3">
              <Checkbox name="terms" onChange={handleChange} />
              <p className="text-gray-500">
                By signing up, you agree to our <span className="text-gray-800">Terms</span> and <span className="text-gray-800">Privacy Policy</span>.
              </p>
            </div>
            {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
            <div>
              <button type="submit" className="w-full px-4 py-3 text-white bg-brand-500 rounded-lg hover:bg-brand-600">
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <p className="mt-5 text-center text-gray-700">
          Already have an account?
          <Link href="/signin" className="text-brand-500 hover:text-brand-600"> Sign In</Link>
        </p>
      </div>
    </div>
  );
}
