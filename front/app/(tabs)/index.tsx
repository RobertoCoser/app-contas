import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { CardFinanceiro } from '../../components/ui/CardFinanceiro';
import { useTransacoes } from '../../contexts/TransacoesContext';
import { useRouter } from 'expo-router';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AuthContext } from '../../contexts/AuthContext'; // <-- importe aqui

export default function Dashboard() {
  const { transacoes } = useTransacoes();
  const router = useRouter();
  const { signOut } = useContext(AuthContext); // <-- use o contexto

  const totalReceitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((soma, t) => soma + t.valor, 0);

  const totalDespesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((soma, t) => soma + t.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  function handleLogout() {
    signOut();
    router.replace('/login'); // Garante navegação para a tela de login
  }

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Text style={styles.title}>Resumo Financeiro</Text>
        <CardFinanceiro tipo="saldo" valor={saldo} />
        <View style={styles.row}>
          <TouchableOpacity style={styles.flex} onPress={() => router.push('/receitas')}>
            <CardFinanceiro tipo="receita" valor={totalReceitas} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flex} onPress={() => router.push('/despesas')}>
            <CardFinanceiro tipo="despesa" valor={totalDespesas} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 32 }}>
          <Button title="Sair" color="#d9534f" onPress={handleLogout} />
        </View>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  flex: { flex: 1 }
});