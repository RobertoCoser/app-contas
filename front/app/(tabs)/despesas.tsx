import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TransactionList } from '../../components/ui/TransactionList';
import { TransactionForm } from '../../components/ui/TransactionForm';
import { useTransacoes } from '../../contexts/TransacoesContext';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Despesas() {
    const { transacoes, adicionarTransacao, alternarPago } = useTransacoes();
    const despesas = transacoes.filter(t => t.tipo === 'despesa');
    const [modalVisible, setModalVisible] = useState(false);

    function handleAdicionarDespesa(data: { descricao: string; valor: number; data: string; pago?: boolean  }) {
        adicionarTransacao({ ...data, tipo: 'despesa', pago: data.pago ?? false });
    }

    return (
        <ProtectedRoute>
            <View style={styles.container}>
                <Text style={styles.title}>Despesas</Text>
                <TransactionList transacoes={despesas} tipo="despesa" onTogglePago={alternarPago}/>
                <Button title="Adicionar Despesa" onPress={() => setModalVisible(true)} />
                <TransactionForm
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleAdicionarDespesa}
                    tipo="despesa"
                />
            </View>
        </ProtectedRoute>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});