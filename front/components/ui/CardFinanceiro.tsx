import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    tipo: 'saldo' | 'receita' | 'despesa';
    valor: number;
};

export function CardFinanceiro({ tipo, valor }: Props) {
    const info = {
        saldo: { label: 'Saldo', color: '#00695c' },
        receita: { label: 'Receitas', color: '#2e7d32' },
        despesa: { label: 'Despesas', color: '#c62828' }
    }[tipo];

    return (
        <View style={[styles.card, { borderColor: info.color }]}>
            <Text style={styles.label}>{info.label}</Text>
            <Text style={[styles.valor, { color: info.color }]}>R$ {valor.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center'
    },
    label: { fontSize: 16, fontWeight: 'bold' },
    valor: { fontSize: 20, marginTop: 8 }
});