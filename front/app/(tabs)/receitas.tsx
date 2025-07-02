import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Header from '../../components/ui/Header';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { TransactionCard } from '../../components/ui/TransactionCard';
import { useTransacoes } from '../../contexts/TransacoesContext';
import TransactionForm from '../../components/ui/TransactionForm';
import ProtectedRoute from '../../components/ProtectedRoute';
import { theme } from '../../theme';

export default function Receitas() {
  const { transacoes, adicionarTransacao, editarTransacao } = useTransacoes();
  const receitas = transacoes.filter(t => t.tipo === 'receita');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingReceita, setEditingReceita] = useState(null);

  function handleAdicionarReceita(data) {
    adicionarTransacao({ ...data, tipo: 'receita', pago: data.pago ?? false });
    setModalVisible(false);
  }

  function handleEditarReceita(data) {
    editarTransacao({ ...editingReceita, ...data });
    setEditingReceita(null);
  }

  return (
    <ProtectedRoute>
      <View style={styles.screen}>
        <Header title="Receitas" />
        <FlatList
          data={receitas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard {...item} onPress={() => setEditingReceita(item)} />
          )}
          contentContainerStyle={{ padding: theme.spacing.screen }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma receita cadastrada.</Text>
          }
        />
        <PrimaryButton title="Adicionar Receita" onPress={() => setModalVisible(true)} />
        <TransactionForm
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAdicionarReceita}
          tipo="receita"
        />
        <TransactionForm
          visible={!!editingReceita}
          onClose={() => setEditingReceita(null)}
          onSubmit={handleEditarReceita}
          tipo="receita"
          transacao={editingReceita}
          isEdit
        />
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: theme.font.size.medium,
    marginTop: 32,
  }
});