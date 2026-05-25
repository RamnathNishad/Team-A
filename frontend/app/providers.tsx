'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/store';
import { restoreAuth } from '@/store/slices/authSlice';
import Cookie from 'js-cookie';

interface ProvidersProps {
  children: ReactNode;
}

function AuthRestorer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const [isRestored, setIsRestored] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Restore auth state from cookie/localStorage on app mount
    const token = Cookie.get('auth_token') || localStorage.getItem('auth_token');
    
    if (token) {
      try {
        // Try to fetch user data from local storage
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          dispatch(restoreAuth({ user, token }));
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
      }
    }
    
    // Mark restoration as complete after a short delay to ensure state is updated
    setTimeout(() => {
      setIsRestored(true);
    }, 100);
  }, [dispatch, isMounted]);

  // If not mounted yet or auth restoration is in progress, show loading screen
  if (!isMounted || !isRestored) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AuthRestorer>
        {children}
      </AuthRestorer>
    </Provider>
  );
}
