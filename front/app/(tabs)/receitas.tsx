import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TransactionList } from '../../components/ui/TransactionList';
import { TransactionForm } from '../../components/ui/TransactionForm';
import { useTransacoes } from '../../contexts/TransacoesContext';
import ProtectedRoute from '../../components/ProtectedRoute';

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

    function handleOpenEdit(receita) {
        setEditingReceita(receita);
    }

    return (
        <ProtectedRoute>
            <View style={styles.container}>
                <Text style={styles.title}>Receitas</Text>
                <TransactionList
                    transacoes={receitas}
                    tipo="receita"
                    onPressItem={handleOpenEdit}
                />
                <Button title="Adicionar Receita" onPress={() => setModalVisible(true)} />
                {/* Formulário para nova receita */}
                <TransactionForm
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleAdicionarReceita}
                    tipo="receita"
                />
                {/* Formulário para editar receita */}
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
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});