import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, senha });
      Alert.alert('Bem-vindo!', `Olá, ${res.data.usuario.nome}`);
      // Aqui você pode salvar o token no AsyncStorage ou Context
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Não tem conta? Cadastre-se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 5 },
  link: { color: 'blue', marginTop: 12, textAlign: 'center' },
});
