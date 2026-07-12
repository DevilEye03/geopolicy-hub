"use client";
import React, { useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useStore } from '../../store/useStore';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const { user, isAdmin } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, router]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ padding: 'var(--space-4xl) var(--space-md)', textAlign: 'center', minHeight: '60vh' }}>
      <h1>Admin Portal</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-2xl)' }}>
        Authorized personnel only.
      </p>

      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          {!isAdmin && <p style={{ color: 'var(--danger)' }}>You are not authorized as an admin.</p>}
          <button className="btn" onClick={handleLogout} style={{ marginTop: 'var(--space-md)' }}>
            Sign Out
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={handleLogin}>
          Sign in with Google
        </button>
      )}
    </div>
  );
}
