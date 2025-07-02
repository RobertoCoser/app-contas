import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/ui/Header';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { useTransacoes } from '../../contexts/TransacoesContext';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../theme';
import { useRouter } from 'expo-router';

export default function Home() {
  const { transacoes } = useTransacoes();
  const { signOut } = useAuth();
  const router = useRouter();

  const receitas = transacoes.filter(t => t.tipo === 'receita');
  const despesas = transacoes.filter(t => t.tipo === 'despesa');
  const totalReceitas = receitas.reduce((acc, cur) => acc + cur.valor, 0);
  const totalDespesas = despesas.reduce((acc, cur) => acc + cur.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <View style={styles.screen}>
      <Header title="Resumo Financeiro" />

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/explore')} activeOpacity={0.8}>
          <Text style={styles.label}>Saldo</Text>
          <Text style={styles.saldo}>R$ {saldo.toFixed(2)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { borderLeftColor: theme.colors.success }]} onPress={() => router.push('/receitas')} activeOpacity={0.8}>
          <Text style={styles.label}>Receitas</Text>
          <Text style={[styles.valor, { color: theme.colors.success }]}>+ R$ {totalReceitas.toFixed(2)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { borderLeftColor: theme.colors.error }]} onPress={() => router.push('/despesas')} activeOpacity={0.8}>
          <Text style={styles.label}>Despesas</Text>
          <Text style={[styles.valor, { color: theme.colors.error }]}>- R$ {totalDespesas.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton
        title="Sair"
        onPress={signOut}
        style={styles.logoutButton}
        textStyle={{ color: theme.colors.error }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.screen,
  },
  cardContainer: {
    marginVertical: 24,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.item,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: theme.colors.primary,
    ...theme.shadow.card,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.font.size.small,
    marginBottom: 4,
  },
  saldo: {
    fontSize: theme.font.size.large,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.text,
  },
  valor: {
    fontSize: theme.font.size.medium,
    fontWeight: theme.font.weight.bold,
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
});