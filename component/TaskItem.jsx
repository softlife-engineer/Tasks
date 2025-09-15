import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Alert,
} from "react-native";
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
  isDarkMode,
}) => {
  return (
    <View style={[styles.card, isDarkMode && styles.cardDark]}>
     
      <TouchableOpacity
        onPress={() => completeTask(index)}
        style={styles.textWrapper}
      >
        <Text
          style={[
            styles.text,
            item.completed && styles.completed,
            isDarkMode && styles.textDark,
            item.completed && isDarkMode && styles.completedDark,
          ]}
        >
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
          style={styles.actionButton}
          onPress={() => {
            setTaskInput(item.title);
            setUpdateIndex(index);
          }}
        >
          <Ionicons name="create-outline" size={24} color="#4F46E5" />
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={async () => {
            try {
              const status = item.completed ? "✅" : "❌";
              const timeStamp = new Date().toLocaleString();
              await Share.share({
                message: `📝 Task Details:\n\n${item.title}\nStatus: ${status}\nShared on: ${timeStamp}`,
              });
            } catch (error) {
              Alert.alert("Error", "Could not share task");
            }
          }}
        >
          <Ionicons name="share-social" size={24} color="#007AFF" />
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteTask(index)}
        >
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
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginBottom: 12,
    marginHorizontal: 20,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  cardDark: {
    backgroundColor: "#1E1E1E",
    borderColor: "rgba(255,255,255,0.1)",
    shadowColor: "#000",
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
  textDark: {
    color: "#fff",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  completedDark: {
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
});
