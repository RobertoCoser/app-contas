import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TransactionList } from '../../components/ui/TransactionList';
import { TransactionForm } from '../../components/ui/TransactionForm';
import { useTransacoes } from '../../contexts/TransacoesContext';

export default function Receitas() {
  const { transacoes, adicionarTransacao } = useTransacoes();
  const receitas = transacoes.filter(t => t.tipo === 'receita');
  const [modalVisible, setModalVisible] = useState(false);

  function handleAdicionarReceita(data: { descricao: string; valor: number; data: string }) {
    adicionarTransacao({ ...data, tipo: 'receita' });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receitas</Text>
      <TransactionList transacoes={receitas} tipo="receita" />
      <Button title="Adicionar Receita" onPress={() => setModalVisible(true)} />
      <TransactionForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAdicionarReceita}
        tipo="receita"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});