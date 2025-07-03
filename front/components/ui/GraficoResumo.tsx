import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useResumoMensal } from '../../hooks/useResumoMensal';

export default function GraficoResumo() {
  const dados = useResumoMensal();

  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const receitas = Array(12).fill(0);
  const despesas = Array(12).fill(0);

  dados.forEach(item => {
    const index = item.mes - 1;
    const total = parseFloat(item.total);
    if (item.tipo === 'receita') receitas[index] = total;
    else despesas[index] = total;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo Mensal</Text>
      <LineChart
        data={{
          labels: meses,
          datasets: [
            { data: receitas, color: () => 'green', strokeWidth: 2 },
            { data: despesas, color: () => 'red', strokeWidth: 2 }
          ],
          legend: ['Receitas', 'Despesas']
        }}
        width={Dimensions.get('window').width - 30}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: () => '#333',
          labelColor: () => '#333',
          propsForDots: { r: '4', strokeWidth: '2', stroke: '#555' }
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  chart: {
    borderRadius: 8,
  },
});
