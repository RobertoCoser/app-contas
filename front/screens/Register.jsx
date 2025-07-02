import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/auth/register", {
        nome,
        email,
        senha,
      });
      Alert.alert("Sucesso", "Cadastro realizado!");
      router.replace("/login");
    } catch (err) {
      Alert.alert("Erro", err?.response?.data?.error || "Erro ao cadastrar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
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
      <Button title="Cadastrar" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => router.replace("/login")}>
        Já tem conta? Entrar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  link: { color: "blue", marginTop: 12, textAlign: "center" },
});
