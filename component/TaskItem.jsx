import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const TaskItem = ({
  item,
  index,
  completeTask,
  setTaskInput,
  setUpdateIndex,
  updateIndex,
  taskInput,
  setTasks,
  tasks,
  deleteTask,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => completeTask(index)}
        style={styles.textWrapper}
      >
        <Text style={[styles.text, item.completed && styles.completed]}>
          {item.title}
        </Text>
        <View style={styles.checkbox}>
          <Ionicons
            name={item.completed ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={item.completed ? "#00C27A" : "#ccc"}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            setTaskInput(item.title);
            setUpdateIndex(index);
          }}
        >
          <Ionicons name="create-outline" size={22} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (updateIndex !== null) {
              const updatedTasks = tasks.map((task, idx) => {
                if (idx === updateIndex) {
                  return { ...task, title: taskInput };
                }
                return task;
              });
              setTasks(updatedTasks);
              setTaskInput("");
              setUpdateIndex(null);
            }
          }}
        >
          <Ionicons name="send" size={22} color="#3B82F6" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTask(index)}>
          <Ionicons name="trash" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 6,
    shadowColor: "#000",
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowRadius: 3,
    elevation: 2,
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
});
