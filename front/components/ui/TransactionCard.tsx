import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

export function TransactionCard({ descricao, valor, data, tipo, pago, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[
        styles.card,
        { borderLeftColor: tipo === 'receita' ? theme.colors.success : theme.colors.error }
      ]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{data}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[
            styles.valor,
            { color: tipo === 'receita' ? theme.colors.success : theme.colors.error }
          ]}>
            {tipo === 'receita' ? '+' : '-'} R$ {valor.toFixed(2)}
          </Text>
          <Text style={{
            color: pago ? theme.colors.success : theme.colors.error,
            fontWeight: theme.font.weight.bold,
            marginTop: 4,
            fontSize: theme.font.size.small
          }}>
            {pago ? 'Pago' : 'Pendente'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    marginVertical: 6,
    padding: theme.spacing.item,
    borderRadius: theme.borderRadius.card,
    ...theme.shadow.card,
    borderLeftWidth: 6,
    alignItems: 'center',
  },
  descricao: {
    fontSize: theme.font.size.medium,
    fontWeight: theme.font.weight.bold,
    color: theme.colors.text
  },
  data: {
    fontSize: theme.font.size.small,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  valor: {
    fontSize: theme.font.size.medium,
    fontWeight: theme.font.weight.bold,
  }
});