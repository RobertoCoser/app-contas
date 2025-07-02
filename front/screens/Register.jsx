import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
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
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <View style={styles.card}>
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
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.link}>
            Já tem conta? <Text style={styles.linkBold}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f7fa",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    width: "92%",
    maxWidth: 380,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2462ff",
    marginBottom: 18,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    padding: 13,
    fontSize: 16,
    marginBottom: 15,
    color: "#222",
  },
  button: {
    width: "100%",
    backgroundColor: "#2462ff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 7,
    marginBottom: 17,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold"
  },
  link: {
    fontSize: 15,
    color: "#666",
    textAlign: "center"
  },
  linkBold: {
    color: "#2462ff",
    fontWeight: "bold"
  }
});