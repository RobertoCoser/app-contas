import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Switch } from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: { descricao: string; valor: number; data: string; pago: boolean}) => void;
    tipo: 'receita' | 'despesa';
    transacao?: { descricao: string; valor: number; data: string; pago: boolean };
    isEdit?: boolean;
};

export default function TransactionForm({ visible, onClose, onSubmit, tipo, transacao, isEdit }: Props) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [pago, setPago] = useState(false);

    useEffect(() => {
        if (transacao && isEdit) {
            setDescricao(transacao.descricao || '');
            setValor(transacao.valor != null ? String(transacao.valor) : '');
            setData(transacao.data || '');
            setPago(transacao.pago ?? false);
        } else if (visible && !isEdit) {
            setDescricao('');
            setValor('');
            setData('');
            setPago(false);
        }
    }, [visible, transacao, isEdit]);

    function handleSubmit() {
        if (!descricao || !valor || !data) {
            alert('Preencha todos os campos!');
            return;
        }
        onSubmit({ descricao, valor: Number(valor), data, pago });
        setDescricao('');
        setValor('');
        setData('');
        setPago(false);
        onClose();
    }

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalBackground}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {isEdit ? 'Editar Despesa' : `Nova ${tipo === 'receita' ? 'Receita' : 'Despesa'}`}
                    </Text>
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
                        placeholder={tipo === 'receita' ? 'Recebido em:' : 'Vencimento:'}
                        value={data}
                        onChangeText={setData}
                    />
                    <View style={styles.switch}>
                        <Text>Pago</Text>
                        <Switch value={pago} onValueChange={setPago} />
                    </View>
                    <View style={styles.buttonRow}>
                        <Button title="Cancelar" onPress={onClose} color="#888" />
                        <Button
                            title="Salvar"
                            onPress={handleSubmit}
                            color={tipo === 'receita' ? '#2e7d32' : '#c62828'}
                        />
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
    switch: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 12,
    }
});