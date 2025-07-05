"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="text-xl font-semibold">Crypto & Forex Investment Platform</div>
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-gray-700">{user.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link href="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
} 