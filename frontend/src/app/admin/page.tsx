"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../utils/api';
import { useNotification } from '../../context/NotificationContext';
import Modal from '../../components/Modal';

function Spinner() {
  return <span className="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>;
}

export default function AdminPage() {
  const { user, token, isAdmin, loading } = useAuth();
  const { showNotification } = useNotification();
  const router = useRouter();
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [banModal, setBanModal] = useState<{ open: boolean; userId: number | null }>({ open: false, userId: null });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/login');
    }
    if (user && isAdmin && token) {
      fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(() => setError('Failed to load users'));
    }
  }, [user, isAdmin, token, loading, router]);

  async function handleBan(userId: number) {
    setActionLoading(userId);
    try {
      const res = await fetch(`${API_URL}/admin/user/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'banned' }),
      });
      if (!res.ok) throw new Error('Action failed');
      showNotification('User banned!', 'success');
      // Refresh users
      const refreshed = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json());
      setUsers(refreshed);
    } catch (err: unknown) {
      showNotification(err.message || 'Action failed', 'error');
    } finally {
      setActionLoading(null);
      setBanModal({ open: false, userId: null });
    }
  }

  if (loading || !user || !isAdmin) return <div className="flex justify-center items-center h-40"><Spinner /></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center justify-center"
                  onClick={() => setBanModal({ open: true, userId: user.id })}
                  disabled={actionLoading === user.id || user.status === 'banned'}
                >
                  {actionLoading === user.id ? <Spinner /> : user.status === 'banned' ? 'Banned' : 'Ban'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={banModal.open}
        title="Confirm Ban"
        message="Are you sure you want to ban this user? This action cannot be undone."
        onConfirm={() => banModal.userId && handleBan(banModal.userId)}
        onCancel={() => setBanModal({ open: false, userId: null })}
        confirmText="Ban"
        cancelText="Cancel"
      />
    </div>
  );
} 