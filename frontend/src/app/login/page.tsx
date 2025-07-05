"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useNotification } from '../../context/NotificationContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const { showNotification } = useNotification();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      showNotification('Login successful!', 'success');
      router.push('/dashboard');
    } catch (err: unknown) {
      showNotification(err.message || 'Login failed', 'error');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full border rounded p-2" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input type="password" className="w-full border rounded p-2" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-600">Don&apos;t have an account?</span>{' '}
        <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
      </div>
    </div>
  );
} 