import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    // Add your register logic here
    console.log("Register clicked", { email, password });
    router.push("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bbb"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#bbb"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} color="#841584" />
      <Link href={"/login"} style={styles.loginLink}>
        Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#222",
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#333",
    color: "#fff",
    padding: 12,
    marginBottom: 24,
  },
  loginLink: {
    fontSize: 16,
    textAlign: "center",
    color: "#bbb",
    marginTop: 16,
  },
});
