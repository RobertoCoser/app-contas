import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { TransacoesProvider } from '../contexts/TransacoesContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <TransacoesProvider>
        <Stack />
      </TransacoesProvider>
    </AuthProvider>
  );
}