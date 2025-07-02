import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ProtectedRoute({ children }) {
  const { signed, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !signed) {
      router.replace('/login');
    }
  }, [signed, loading]);

  if (loading || !signed) {
    return null;
  }

  return children;
}