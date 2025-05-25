import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Transacao = {
    id: string;
    descricao: string;
    valor: number;
    data: string;
};

type Props = {
    transacoes: Transacao[];
    tipo: 'receita' | 'despesa';
};

export function TransactionList({ transacoes, tipo }: Props) {
    return (
        <FlatList
            data={transacoes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.descricao}>{item.descricao}</Text>
                    <Text style={[styles.valor, { color: tipo === 'receita' ? '#2e7d32' : '#c62828' }]}>
                        {tipo === 'receita' ? '+' : '-'} R$ {item.valor.toFixed(2)}
                    </Text>
                    <Text style={styles.data}>{item.data}</Text>
                </View>
            )}
            ListEmptyComponent={<Text style={styles.empty}>Nenhuma transação cadastrada.</Text>}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    descricao: { fontSize: 16, fontWeight: 'bold' },
    valor: { fontSize: 16, marginTop: 4 },
    data: { fontSize: 12, color: '#888', marginTop: 2 },
    empty: { textAlign: 'center', marginTop: 24, color: '#aaa' },
});