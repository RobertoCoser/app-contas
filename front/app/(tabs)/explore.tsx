import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTransacoes } from '../../contexts/TransacoesContext';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Explore() {
    const { transacoes } = useTransacoes();

    const totalReceitas = transacoes
        .filter(t => t.tipo === 'receita')
        .reduce((soma, t) => soma + t.valor, 0);

    const totalDespesas = transacoes
        .filter(t => t.tipo === 'despesa')
        .reduce((soma, t) => soma + t.valor, 0);

    const totalGeral = totalReceitas + totalDespesas;

    function percent(value: number) {
        if (!totalGeral) return '0%';
        return `${((value / totalGeral) * 100).toFixed(1)}%`;
    }

    const data = [
        {
            name: `Receitas (${percent(totalReceitas)})`,
            value: totalReceitas,
            color: '#2e7d32',
            legendFontColor: '#2e7d32',
            legendFontSize: 16
        },
        {
            name: `Despesas (${percent(totalDespesas)})`,
            value: totalDespesas,
            color: '#c62828',
            legendFontColor: '#c62828',
            legendFontSize: 16
        }
    ];

    return (
        <ProtectedRoute>
            <View style={styles.container}>
                <Text style={styles.title}>Composição Financeira</Text>
                <PieChart
                    data={data.map(item => ({
                        name: item.name,
                        population: item.value,
                        color: item.color,
                        legendFontColor: item.legendFontColor,
                        legendFontSize: item.legendFontSize
                    }))}
                    width={Dimensions.get('window').width - 32}
                    height={280}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="10"
                    absolute
                />
            </View>
        </ProtectedRoute>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center'
    }
});