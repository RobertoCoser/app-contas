import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { theme } from '../../theme';

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
    onPressItem?: (transacao: Transacao) => void;
};

export function TransactionList({ transacoes, tipo, onPressItem }: Props) {
    return (
        <FlatList
            data={transacoes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => onPressItem && onPressItem(item)}
                    style={[
                        styles.item,
                        { borderLeftColor: tipo === 'receita' ? theme.colors.success : theme.colors.error }
                    ]}
                    activeOpacity={0.85}
                >
                    <Text style={styles.descricao}>{item.descricao}</Text>
                    <Text
                        style={[
                            styles.valor,
                            { color: tipo === 'receita' ? theme.colors.success : theme.colors.error }
                        ]}
                    >
                        {tipo === 'receita' ? '+' : '-'} R$ {item.valor.toFixed(2)}
                    </Text>
                    <Text style={styles.data}>
                        {tipo === 'receita' ? 'Recebido em: ' : 'Vencimento: '} {item.data}
                    </Text>
                    {tipo === 'despesa' && (
                        <Text style={{
                            color: item.pago ? theme.colors.success : theme.colors.error,
                            fontWeight: theme.font.weight.bold,
                            fontSize: theme.font.size.small,
                            marginTop: 4
                        }}>
                            {item.pago ? 'Pago' : 'Pendente'}
                        </Text>
                    )}
                </TouchableOpacity>
            )}
            ListEmptyComponent={
                <Text style={styles.empty}>Nenhuma transação cadastrada.</Text>
            }
            contentContainerStyle={{ padding: theme.spacing.screen }}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.card,
        padding: theme.spacing.item,
        marginBottom: 8,
        borderLeftWidth: 6,
        ...theme.shadow.card,
    },
    descricao: {
        fontSize: theme.font.size.medium,
        fontWeight: theme.font.weight.bold,
        color: theme.colors.text,
    },
    valor: {
        fontSize: theme.font.size.medium,
        fontWeight: theme.font.weight.bold,
        marginTop: 4,
    },
    data: {
        fontSize: theme.font.size.small,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    empty: {
        textAlign: 'center',
        marginTop: 32,
        color: theme.colors.textSecondary,
        fontSize: theme.font.size.medium,
    },
});