import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: { descricao: string; valor: number; data: string }) => void;
    tipo: 'receita' | 'despesa';
};

export function TransactionForm({ visible, onClose, onSubmit, tipo }: Props) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');

    function handleSubmit() {
        if (!descricao || !valor || !data) {
            alert('Preencha todos os campos!');
            return;
        }
        onSubmit({ descricao, valor: Number(valor), data });
        setDescricao('');
        setValor('');
        setData('');
        onClose();
    }

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalBackground}>
                <View style={styles.container}>
                    <Text style={styles.title}>Nova {tipo === 'receita' ? 'Receita' : 'Despesa'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Descrição"
                        value={descricao}
                        onChangeText={setDescricao}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Valor"
                        value={valor}
                        keyboardType="numeric"
                        onChangeText={setValor}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Data (YYYY-MM-DD)"
                        value={data}
                        onChangeText={setData}
                    />
                    <View style={styles.buttonRow}>
                        <Button title="Cancelar" onPress={onClose} color="#888" />
                        <Button title="Salvar" onPress={handleSubmit} color={tipo === 'receita' ? '#2e7d32' : '#c62828'} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
});