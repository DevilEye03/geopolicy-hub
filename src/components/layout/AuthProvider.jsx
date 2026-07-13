"use client";
import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useStore } from '../../store/useStore';

export function AuthProvider({ children }) {
  const { setUser, setIsAdmin } = useStore();

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || currentUser.email.split('@')[0],
          email: currentUser.email,
          avatar: currentUser.photoURL || 'GP'
        });
        
        const adminEmail = "ankur.upadhyay7v@gmail.com";
        setIsAdmin(currentUser.email === adminEmail);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, setIsAdmin]);

  return <>{children}</>;
}
