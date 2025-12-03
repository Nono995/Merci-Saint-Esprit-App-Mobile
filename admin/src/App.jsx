import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ContentManager from './pages/ContentManager';
import UserManager from './pages/UserManager';
import EventManager from './pages/EventManager';
import DonationManager from './pages/DonationManager';
import TestimonyManager from './pages/TestimonyManager';
import Analytics from './pages/Analytics';
import NotificationManager from './pages/NotificationManager';
import Layout from './components/Layout';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/content" element={<ContentManager />} />
          <Route path="/users" element={<UserManager />} />
          <Route path="/events" element={<EventManager />} />
          <Route path="/testimonies" element={<TestimonyManager />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/notifications" element={<NotificationManager />} />
          <Route path="/donations" element={<DonationManager />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
