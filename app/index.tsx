import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt?: string;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching todos");
        setLoading(false);
      });
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodo }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos([...todos, data]);
          setNewTodo("");
        })
        .catch((error) => {
          setError("Error adding todo");
        });
    }
  };

  const deleteTodo = (id: string) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        setError("Error deleting todo");
      });
  };

  const toggleTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: todo.text, completed: !todo.completed }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
        })
        .catch((error) => {
          setError("Error toggling todo");
        });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#841584" />
      </View>
    );
  }

  if (error) {
    Alert.alert("Error", error);
    setError("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="New Todo"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button title="Add Todo" color="#841584" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <View
                style={[
                  styles.checkbox,
                  { backgroundColor: item.completed ? "#4CAF50" : "#ccc" },
                ]}
              >
                {item.completed && (
                  <Feather name="check" size={16} color="#fff" />
                )}
              </View>
            </TouchableOpacity>

            <Text
              style={[styles.todoText, item.completed && styles.completedText]}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Feather name="trash" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginTop: 50,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#555",
    color: "#333",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  todoText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 12,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});
