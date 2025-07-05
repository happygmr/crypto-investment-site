"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../utils/api';

interface DashboardData {
  balance: number;
  trades: number;
  groups: number;
}

export default function DashboardPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
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
          setDashboard({
            balance: data.profile?.wallet?.balance || 0,
            trades: data.trader?.trades?.length || 0,
            groups: data.trader?.copy_groups?.length || 0,
          });
        })
        .catch(() => setError('Failed to load dashboard'));
    }
  }, [user, token, loading, router]);

  if (loading || !user) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const dashboardData = dashboard || { balance: 0, trades: 0, groups: 0 };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500">Balance</div>
          <div className="text-2xl font-bold">${dashboardData.balance.toString()}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500">Your Trades</div>
          <div className="text-2xl font-bold">{dashboardData.trades.toString()}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500">Copy Groups</div>
          <div className="text-2xl font-bold">{dashboardData.groups.toString()}</div>
        </div>
      </div>
    </div>
  );
} 