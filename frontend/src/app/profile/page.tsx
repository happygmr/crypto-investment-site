import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../utils/api';
import { useNotification } from '../../context/NotificationContext';

export default function ProfilePage() {
  const { user, token, loading } = useAuth();
  const { showNotification } = useNotification();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user && token) {
      fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setProfile(data.profile);
          setForm({
            phone: data.profile?.phone || '',
            address: data.profile?.address || '',
            country: data.profile?.country || '',
            avatar: data.profile?.avatar || '',
          });
        })
        .catch(() => setError('Failed to load profile'));
    }
  }, [user, token, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      showNotification('Profile updated!', 'success');
    } catch (err: any) {
      showNotification(err.message || 'Failed to update profile', 'error');
    } finally {
      setFormLoading(false);
    }
  }

  if (loading || !user) return <div className="flex justify-center items-center h-40"><Spinner /></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" className="w-full border rounded p-2" value={user.name} readOnly placeholder="Your name" />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full border rounded p-2" value={user.email} readOnly placeholder="Your email" />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input type="text" className="w-full border rounded p-2" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Enter your phone" />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input type="text" className="w-full border rounded p-2" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Enter your address" />
        </div>
        <div>
          <label className="block text-gray-700">Country</label>
          <input type="text" className="w-full border rounded p-2" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="Enter your country" />
        </div>
        <div>
          <label className="block text-gray-700">Avatar URL</label>
          <input type="text" className="w-full border rounded p-2" value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} placeholder="Avatar URL" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center" disabled={formLoading}>{formLoading ? <Spinner /> : 'Save'}</button>
      </form>
    </div>
  );
}

function Spinner() {
  return <span className="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>;
} 