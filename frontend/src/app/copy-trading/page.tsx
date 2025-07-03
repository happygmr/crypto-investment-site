import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../utils/api';
import { useNotification } from '../../context/NotificationContext';

function Spinner() {
  return <span className="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>;
}

export default function CopyTradingPage() {
  const { user, token, loading } = useAuth();
  const { showNotification } = useNotification();
  const router = useRouter();
  const [groups, setGroups] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user && token) {
      fetch(`${API_URL}/copy-groups`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setGroups(data))
        .catch(() => setError('Failed to load groups'));
    }
  }, [user, token, loading, router]);

  async function handleFollow(groupId: number, isFollowing: boolean) {
    setActionLoading(groupId);
    try {
      const url = isFollowing ? `${API_URL}/copy/unfollow` : `${API_URL}/copy/follow`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ group_id: groupId }),
      });
      if (!res.ok) throw new Error('Action failed');
      showNotification(isFollowing ? 'Unfollowed group!' : 'Now following group!', 'success');
      // Refresh groups
      const refreshed = await fetch(`${API_URL}/copy-groups`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json());
      setGroups(refreshed);
    } catch (err: any) {
      showNotification(err.message || 'Action failed', 'error');
    } finally {
      setActionLoading(null);
    }
  }

  if (loading || !user) return <div className="flex justify-center items-center h-40"><Spinner /></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Copy Trading Groups</h1>
      <div className="space-y-4">
        {groups.map(group => (
          <div key={group.id} className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
            <div>
              <div className="font-semibold text-lg">{group.name}</div>
              <div className="text-gray-500">{group.description}</div>
            </div>
            <button
              className={`px-4 py-2 rounded flex items-center justify-center ${group.isFollowing ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}
              onClick={() => handleFollow(group.id, group.isFollowing)}
              disabled={actionLoading === group.id}
            >
              {actionLoading === group.id ? <Spinner /> : group.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 