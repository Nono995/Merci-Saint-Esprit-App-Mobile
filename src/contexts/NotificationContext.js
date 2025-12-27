import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const NotificationContext = createContext({
  unreadCount: 0,
  notifications: [],
});

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    return { unreadCount: 0, notifications: [] };
  }
  return context;
}

export function NotificationProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'notifications'),
      orderBy('sentDate', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notifs = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(notif => notif.sent === true);

        setNotifications(notifs);
        
        // Compter les notifications non lues
        const unread = notifs.filter(n => !n.read).length;
        setUnreadCount(unread);
      },
      (error) => {
        console.error('Error loading notifications:', error);
        setUnreadCount(0);
        setNotifications([]);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = {
    unreadCount,
    notifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
