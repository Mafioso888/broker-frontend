'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Simple validation function
  function validate() {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords don't match.";
    }

    return newErrors;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      // Here you could call your backend API to create the user
      // For now, we just simulate success
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md p-8 rounded-xl bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 shadow-lg ring-1 ring-pink-600">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Create Your Account
        </h1>

        {submitted ? (
          <div className="text-center text-green-400 font-semibold">
            Thank you for signing up! Check your email to verify your account.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} noValidate>
              <label className="block mb-4">
                <span className="text-sm font-semibold mb-1 block">Full Name</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full rounded-md px-3 py-2 text-black ${
                    errors.fullName ? 'border-2 border-red-500' : ''
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </label>

              <label className="block mb-4">
                <span className="text-sm font-semibold mb-1 block">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-md px-3 py-2 text-black ${
                    errors.email ? 'border-2 border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </label>

              <label className="block mb-4">
                <span className="text-sm font-semibold mb-1 block">Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={`w-full rounded-md px-3 py-2 text-black ${
                    errors.password ? 'border-2 border-red-500' : ''
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </label>

              <label className="block mb-6">
                <span className="text-sm font-semibold mb-1 block">Confirm Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className={`w-full rounded-md px-3 py-2 text-black ${
                    errors.confirmPassword ? 'border-2 border-red-500' : ''
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </label>

              <button
                type="submit"
                className="w-full py-3 mb-4 bg-gradient-to-br from-pink-600 via-purple-600 to-red-600 hover:from-pink-700 hover:via-purple-700 hover:to-red-700 rounded-xl text-white font-semibold transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-sm text-zinc-400">
              Already have an account?{' '}
              <Link href="/login" className="text-pink-500 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
