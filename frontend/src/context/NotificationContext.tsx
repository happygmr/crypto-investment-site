import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  message: string;
  type: 'success' | 'error';
}

interface NotificationContextType {
  notification: Notification | null;
  showNotification: (message: string, type: 'success' | 'error') => void;
  clearNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  function showNotification(message: string, type: 'success' | 'error') {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }

  function clearNotification() {
    setNotification(null);
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
} 