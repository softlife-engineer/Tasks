import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Share,
  Alert,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import TaskInput from "./component/TaskInput";
import TaskItem from "./component/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tasks, setTasks] = useState([
    { title: "Complete your project", completed: true },
  ]);
  const [taskInput, setTaskInput] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    if (updateIndex !== null) {
      const updatedTasks = tasks.map((task, idx) =>
        idx === updateIndex ? { ...task, title: taskInput } : task
      );
      setTasks(updatedTasks);
      setUpdateIndex(null);
    } else {
      setTasks([...tasks, { title: taskInput, completed: false }]);
    }

    setTaskInput("");
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  const shareTasksHandler = async () => {
    if (tasks.length === 0) {
      Alert.alert("No tasks to share");
      return;
    }

    const taskList = tasks
      .map((task, index) => {
        const status = task.completed ? "✅" : "❌";
        return `${index + 1}. ${task.title} ${status}`;
      })
      .join("\n");

    try {
      await Share.share({
        message: `My Tasks:\n${taskList}`,
      });
    } catch (error) {
      Alert.alert("Error", "Could not share tasks");
    }
  };

  
  React.useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
       
      }
    };
    loadTasks();
  }, []);

  
  React.useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.containerDark]}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />

    
      <View style={styles.themeToggle}>
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={24}
          color={isDarkMode ? "#fff" : "#000"}
        />
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: "#767577", true: "#4AC4CF" }}
          thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
        />
      </View>

     
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <TaskInput
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          addTask={addTask}
          tasks={tasks}
          isDarkMode={isDarkMode}
        />
      </View>

     
      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskItem
            item={item}
            index={index}
            completeTask={completeTask}
            setTaskInput={setTaskInput}
            setUpdateIndex={setUpdateIndex}
            updateIndex={updateIndex}
            taskInput={taskInput}
            setTasks={setTasks}
            tasks={tasks}
            deleteTask={deleteTask}
            isDarkMode={isDarkMode}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4AC4CF",
    paddingTop: 40,
  },
  containerDark: {
    backgroundColor: "#121212", 
  },
  header: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerDark: {
    borderBottomColor: "#333",
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});
