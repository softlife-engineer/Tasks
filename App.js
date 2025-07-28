import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { useState } from "react";
import TaskInput from "./component/TaskInput";
import TaskItem from "./component/TaskItem";

export default function App() {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TaskInput
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        addTask={addTask}
        tasks={tasks}
      />
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
    backgroundColor: "#4AC4CF", // Soft light aqua background
    paddingTop: 40,
  },
});
