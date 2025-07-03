import React from 'react';
import { useNotification } from '../context/NotificationContext';

export default function Toast() {
  const { notification } = useNotification();
  if (!notification) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white transition-all ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {notification.message}
    </div>
  );
} 