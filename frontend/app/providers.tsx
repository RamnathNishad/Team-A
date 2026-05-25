'use client';

import React, { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/store';
import { restoreAuth } from '@/store/slices/authSlice';
import Cookie from 'js-cookie';

interface ProvidersProps {
  children: ReactNode;
}

function AuthRestorer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore auth state from cookie on app mount
    const token = Cookie.get('auth_token');
    if (token) {
      try {
        // Try to fetch user data from local storage or API
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          dispatch(restoreAuth({ user, token }));
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
      }
    }
  }, [dispatch]);

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
