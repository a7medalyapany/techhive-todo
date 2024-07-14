import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Add your login logic here
    console.log("Login clicked", { email, password });
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} color="#841584" />
      <Link href={"/register"} style={styles.registerLink}>
        Register
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
  registerLink: {
    fontSize: 16,
    textAlign: "center",
    color: "#bbb",
    marginTop: 16,
  },
});
