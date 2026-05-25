import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: { id: string; email: string; name: string } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth(): UseAuthReturn {
  const { isAuthenticated, user, token, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
  };
}
