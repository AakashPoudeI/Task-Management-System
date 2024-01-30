import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';
import { RouteParams } from '../navigation/types';

interface IProps {}

const TaskDetailScreen: FC<IProps> = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteParams['route']>();
  const taskId = route.params?.task?.id;
  const [list, setList] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    fetchData();

    // Set up real-time listener for the specific task
    const taskRef = firebase
      .app()
      .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`todo/${taskId}`);

    const onTaskValueChange = taskRef.on('value', (snapshot) => {
      // Call fetchData whenever the task data changes
      fetchData();
    });

    // Stop listening for updates when no longer required
    return () => taskRef.off('value', onTaskValueChange);
  }, [taskId]);

  const fetchData = async () => {
    try {
      const snapshot = await firebase
        .app()
        .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('todo')
        .once('value');

      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert data object to an array with type annotations
        const listArray: { id: string; selectedDate: string; title: string; description: string }[] = Object.values(data);

        // Sort the array chronologically based on the selectedDate
        const sortedList = listArray.sort((a, b) => {
          const dateA = new Date(a.selectedDate).getTime();
          const dateB = new Date(b.selectedDate).getTime();
          return dateA - dateB;
        });

        setList(sortedList);

        // Find the task with the specified taskId
        const selectedTask = sortedList.find((task) => task.id === taskId);

        // Set title and description based on the selected task
        if (selectedTask) {
          setTitle(selectedTask.title);
          setDescription(selectedTask.description);
        }
      } else {
        // No data found
        setList([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateData = async () => {
    try {
      await firebase
        .app()
        .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref(`todo/${taskId}`)
        .update({
          title: title,
          description: description,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
        });

      // Show an alert or perform any other action after successful update
      Alert.alert('Task updated successfully!');
      navigation.navigate("TaskViewScreen")
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deleteData = async () => {
    try {
      await firebase
        .app()
        .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref(`todo/${taskId}`)
        .set(null);

      // Show an alert or perform any other action after successful deletion
      Alert.alert('Task deleted successfully!');
      navigation.navigate("TaskViewScreen") // Navigate back to TaskViewScreen
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const { container, text, button, inputStyle, buttonText } = styles;

  return (
    <ScrollView style={container}>
      <Text style={text}>TaskDetailScreen</Text>

      <>
        <Text style={text}>Title:</Text>
        <TextInput
          style={inputStyle}
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Enter title"
        />

        <Text style={text}>Description:</Text>
        <TextInput
          style={inputStyle}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Enter description"
        />

        <View style={button}>
          <Button title="Update Task" onPress={updateData} color="#4CAF50" />
        </View>
        <View style={button}>
          <Button title="Delete Task" onPress={deleteData} color="#f44336" />
        </View>
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color:'black'
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default TaskDetailScreen;
