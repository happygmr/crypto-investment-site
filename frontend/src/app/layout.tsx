import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';
import Toast from '../components/Toast';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Investment Platform",
  description: "Crypto & Forex Investment Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NotificationProvider>
            <Toast />
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 bg-gray-50 p-8">
                <Navbar />
                {children}
              </main>
            </div>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
