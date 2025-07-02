import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await signIn(email, senha);
      router.replace("/(tabs)");
    } catch (err) {
      Alert.alert("Erro", err?.response?.data?.error || "Erro ao fazer login");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Entrar</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/cadastro")}>
          <Text style={styles.link}>
            Não tem conta? <Text style={styles.linkBold}>Cadastre-se</Text>
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