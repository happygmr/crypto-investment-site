import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useNotification } from '../../context/NotificationContext';

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const { showNotification } = useNotification();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await register(name, email, password);
      showNotification('Registration successful!', 'success');
      router.push('/dashboard');
    } catch (err: any) {
      showNotification(err.message || 'Registration failed', 'error');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" className="w-full border rounded p-2" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full border rounded p-2" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input type="password" className="w-full border rounded p-2" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-600">Already have an account?</span>{' '}
        <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
      </div>
    </div>
  );
} 