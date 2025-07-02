import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TransactionList } from '../../components/ui/TransactionList';
import { TransactionForm } from '../../components/ui/TransactionForm';
import { useTransacoes } from '../../contexts/TransacoesContext';
import ProtectedRoute from '../../components/ProtectedRoute';

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
        editarTransacao({ ...editingDespesa, ...data });
        setEditingDespesa(null);
    }

    function handleOpenEdit(despesa) {
        setEditingDespesa(despesa);
    }

    return (
        <ProtectedRoute>
            <View style={styles.container}>
                <Text style={styles.title}>Despesas</Text>
                <TransactionList
                    transacoes={despesas}
                    tipo="despesa"
                    onPressItem={handleOpenEdit}
                />
                <Button title="Adicionar Despesa" onPress={() => setModalVisible(true)} />
                {/* Formulário para nova despesa */}
                <TransactionForm
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleAdicionarDespesa}
                    tipo="despesa"
                />
                {/* Formulário para editar despesa */}
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
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});