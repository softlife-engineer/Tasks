import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Share,
  Alert,
  Switch,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import TaskInput from "./component/TaskInput";
import TaskItem from "./component/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [allTasks, setAllTasks] = useState([
    { title: "Complete your project", completed: true },
  ]);
  const [tasks, setTasks] = useState(allTasks);
  const [taskInput, setTaskInput] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    if (updateIndex !== null) {
      const updatedTasks = allTasks.map((task, idx) =>
        idx === updateIndex ? { ...task, title: taskInput } : task
      );
      setAllTasks(updatedTasks);
      setTasks(updatedTasks);
      setUpdateIndex(null);
    } else {
      const newTasks = [...allTasks, { title: taskInput, completed: false }];
      setAllTasks(newTasks);
      setTasks(newTasks);
    }

    setTaskInput("");
  };

  const completeTask = (index) => {
    const updatedTasks = allTasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setAllTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = allTasks.filter((_, idx) => idx !== index);
    setAllTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  // 🔹 Filters
  const getCompletedTasks = () => {
    setTasks(allTasks.filter((task) => task.completed));
  };

  const getUncompletedTasks = () => {
    setTasks(allTasks.filter((task) => !task.completed));
  };

  const getAllTasks = () => {
    setTasks(allTasks);
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

  // 🔹 Load saved tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          const parsed = JSON.parse(storedTasks);
          setAllTasks(parsed);
          setTasks(parsed);
        }
      } catch (error) {}
    };
    loadTasks();
  }, []);

  // 🔹 Save tasks
  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks]);

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

      
      <View style={styles.filterRow}>
        <TouchableOpacity
          onPress={getCompletedTasks}
          style={[
            styles.filterBtn,
            isDarkMode ? styles.filterBtnDark : styles.filterBtnLight,
          ]}
        >
          <Text
            style={isDarkMode ? styles.filterTextDark : styles.filterTextLight}
          >
            Completed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={getUncompletedTasks}
          style={[
            styles.filterBtn,
            isDarkMode ? styles.filterBtnDark : styles.filterBtnLight,
          ]}
        >
          <Text
            style={isDarkMode ? styles.filterTextDark : styles.filterTextLight}
          >
            Uncompleted
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={getAllTasks}
          style={[
            styles.filterBtn,
            isDarkMode ? styles.filterBtnDark : styles.filterBtnLight,
          ]}
        >
          <Text
            style={isDarkMode ? styles.filterTextDark : styles.filterTextLight}
          >
            All
          </Text>
        </TouchableOpacity>
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

  // 🔹 Filter row (horizontal)
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 10,
  },

  filterBtnLight: {
    backgroundColor: "#E6F7FA",
    borderColor: "#4AC4CF",
  },
  filterTextLight: {
    color: "#000",
    fontWeight: "600",
  },

  filterBtnDark: {
    backgroundColor: "#1E1E1E",
    borderColor: "#4AC4CF",
  },
  filterTextDark: {
    color: "#fff",
    fontWeight: "600",
  },
});
