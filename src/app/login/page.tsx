'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Forgot password modal state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotErrors, setForgotErrors] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  function validate() {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
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
      // TODO: Hook up real login
    }
  }

  // Forgot password validation & submission
  function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotErrors('Email is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotErrors('Email is invalid.');
      return;
    }

    setForgotErrors('');
    setForgotSuccess(true);

    // Simulate API call delay
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotEmail('');
      setForgotSuccess(false);
      alert('If this email exists in our system, a password reset link has been sent.');
    }, 2000);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md p-8 rounded-xl bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 shadow-lg ring-1 ring-pink-600">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Welcome Back
        </h1>

        {submitted ? (
          <div className="text-center text-green-400 font-semibold">
            Successfully logged in! Redirecting...
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} noValidate>
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

              <label className="block mb-2">
                <span className="text-sm font-semibold mb-1 block">Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className={`w-full rounded-md px-3 py-2 text-black ${
                    errors.password ? 'border-2 border-red-500' : ''
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </label>

              <div className="text-right mb-6">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-pink-500 hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 mb-4 bg-gradient-to-br from-pink-600 via-purple-600 to-red-600 hover:from-pink-700 hover:via-purple-700 hover:to-red-700 rounded-xl text-white font-semibold transition"
              >
                Log In
              </button>
            </form>

            <p className="text-center text-sm text-zinc-400">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-pink-500 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </>
        )}
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-sm shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-pink-500 hover:text-pink-700"
              onClick={() => {
                setShowForgotModal(false);
                setForgotErrors('');
                setForgotEmail('');
                setForgotSuccess(false);
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-pink-500">Reset Password</h2>
            {!forgotSuccess ? (
              <form onSubmit={handleForgotSubmit} noValidate>
                <label className="block mb-4">
                  <span className="text-sm font-semibold mb-1 block text-white">
                    Enter your email address
                  </span>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full rounded-md px-3 py-2 text-black ${
                      forgotErrors ? 'border-2 border-red-500' : ''
                    }`}
                    required
                  />
                  {forgotErrors && (
                    <p className="text-red-500 text-xs mt-1">{forgotErrors}</p>
                  )}
                </label>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-br from-pink-600 via-purple-600 to-red-600 hover:from-pink-700 hover:via-purple-700 hover:to-red-700 rounded-xl text-white font-semibold transition"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              <p className="text-green-400 font-semibold text-center">
                If this email exists, a reset link has been sent!
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
