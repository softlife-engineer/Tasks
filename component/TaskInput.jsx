import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const TaskInput = ({ taskInput, setTaskInput, addTask, tasks }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Manager</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter your today task.."
          style={styles.input}
          placeholderTextColor="#c8f3df"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.counter}>Number of Tasks: {tasks.length}</Text>
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#46D9A0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#00C27A",
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  counter: {
    marginTop: 6,
    color: "#fff",
    fontSize: 14,
  },
});
