import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Header from '../../components/ui/Header';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { TransactionCard } from '../../components/ui/TransactionCard';
import { useTransacoes } from '../../contexts/TransacoesContext';
import TransactionForm from '../../components/ui/TransactionForm';
import ProtectedRoute from '../../components/ProtectedRoute';
import { theme } from '../../theme';

export default function Despesas() {
    const { transacoes, adicionarTransacao, editarTransacao } = useTransacoes();
    const despesas = transacoes.filter(t => t.tipo === 'despesa');
    const [modalVisible, setModalVisible] = useState(false);
    const [editingDespesa, setEditingDespesa] = useState(null);

    function handleAdicionarDespesa(data) {
        adicionarTransacao({ ...data, tipo: 'despesa', pago: data.pago ?? false });
        setModalVisible(false);
    }

    function handleEditarDespesa(data) {
        // Garante que o id original vá junto!
        editarTransacao({ ...editingDespesa, ...data });
        setEditingDespesa(null);
    }

    return (
        <ProtectedRoute>
            <View style={styles.screen}>
                <Header title="Despesas" />
                <FlatList
                    data={despesas}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TransactionCard {...item} onPress={() => setEditingDespesa(item)} />
                    )}
                    contentContainerStyle={{ padding: theme.spacing.screen }}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhuma despesa cadastrada.</Text>
                    }
                />
                <PrimaryButton title="Adicionar Despesa" onPress={() => setModalVisible(true)} />
                <TransactionForm
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleAdicionarDespesa}
                    tipo="despesa"
                />
                <TransactionForm
                    visible={!!editingDespesa}
                    onClose={() => setEditingDespesa(null)}
                    onSubmit={handleEditarDespesa}
                    tipo="despesa"
                    transacao={editingDespesa}
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