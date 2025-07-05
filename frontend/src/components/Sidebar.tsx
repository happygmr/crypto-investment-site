"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, isAdmin } = useAuth();
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 min-h-screen">
      <div className="text-2xl font-bold mb-8">Crypto Invest</div>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link href="/profile" className="hover:text-blue-400">Profile</Link>
        <Link href="/copy-trading" className="hover:text-blue-400">Copy Trading</Link>
        {isAdmin && <Link href="/admin" className="hover:text-blue-400">Admin</Link>}
      </nav>
    </aside>
  );
} 