import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

type Transacao = {
    id: string;
    descricao: string;
    valor: number;
    data: string;
    pago: boolean;
};

type Props = {
    transacoes: Transacao[];
    tipo: 'receita' | 'despesa';
    onPressItem?: (transacao: Transacao) => void; // agora recebe a transação
};

export function TransactionList({ transacoes, tipo, onPressItem }: Props) {
    return (
        <FlatList
            data={transacoes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => onPressItem && onPressItem(item)}
                    style={styles.item}
                >
                    <Text style={styles.descricao}>{item.descricao}</Text>
                    <Text style={[
                        styles.valor,
                        { color: tipo === 'receita' ? '#2e7d32' : '#c62828' }
                    ]}>
                        {tipo === 'receita' ? '+' : '-'} R$ {item.valor.toFixed(2)}
                    </Text>
                    <Text style={styles.data}>
                        {tipo === 'receita' ? 'Recebido em: ' : 'Vencimento: '} {item.data}
                    </Text>
                    {tipo === 'despesa' && (
                        <Text style={{ color: item.pago ? 'green' : 'red' }}>
                            {item.pago ? 'Pago' : 'Pendente'}
                        </Text>
                    )}
                </TouchableOpacity>
            )}
            ListEmptyComponent={
                <Text style={styles.empty}>Nenhuma transação cadastrada.</Text>
            }
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