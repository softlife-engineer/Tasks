import { View, Text } from 'react-native'
import React from 'react'
import { Button, FlatList, TouchableOpacity } from 'react-native';

const TaskList = ({ tasks, setTasks, taskInput, setTaskInput, updateIndex, setUpdateIndex, deleteTask }) => {
  const completeTask = (id) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });    

    setTasks(updatedTasks);
  };    

  return (
    <View>
          <FlatList
            data={tasks}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => completeTask(index)}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Text
                  style={{
                    textDecorationLine: item.completed
                      ? "line-through"
                      : "none",
                    fontSize: 30,
                  }}
                >
                  {item.title}
                </Text>
                <Button
                  title="Edit"
                  onPress={() => {
                    setTaskInput(item.title);
                    setUpdateIndex(index);
                  }}
                />
                <Button
                  title="Save"
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
                />
                <Button title="Delete" onPress={() => deleteTask(index)} />
              </TouchableOpacity>
            )}
          />
        </View>
         
   
  ) 
}

export default TaskList
