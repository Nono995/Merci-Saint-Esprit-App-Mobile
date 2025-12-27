import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { getCurrentAdmin, logoutAdmin } from '../services/authAdmin';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Vérifier que l'utilisateur est admin
          const currentAdmin = await getCurrentAdmin();
          if (isMounted) {
            if (currentAdmin) {
              setAdmin(currentAdmin);
              setError(null);
            } else {
              // L'utilisateur n'est pas admin, le déconnecter
              await logoutAdmin();
              setAdmin(null);
              setError('Accès refusé : vous n\'êtes pas administrateur');
            }
          }
        } else {
          if (isMounted) {
            setAdmin(null);
            setError(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setAdmin(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await logoutAdmin();
      setAdmin(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, error, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
