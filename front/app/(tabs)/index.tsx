import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CardFinanceiro } from '../../components/ui/CardFinanceiro';
import { useTransacoes } from '../../contexts/TransacoesContext';
import { useRouter } from 'expo-router';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Dashboard() {
  const { transacoes } = useTransacoes();
  const router = useRouter();

  const totalReceitas = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((soma, t) => soma + t.valor, 0);

  const totalDespesas = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((soma, t) => soma + t.valor, 0);

  const saldo = totalReceitas - totalDespesas;

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
        {/* Aqui você pode incluir gráficos ou listas de transações recentes */}
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