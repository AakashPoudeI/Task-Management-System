import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
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

  const fetchData = async () => {
    try {
      const snapshot = await firebase.app().database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/').ref('todo').once('value');

      if (snapshot.exists()) {
        const data = snapshot.val();
        const listArray: { id: string; selectedDate: string; title: string; description: string }[] = Object.values(data);

        const sortedList = listArray.sort((a, b) => new Date(a.selectedDate).getTime() - new Date(b.selectedDate).getTime());
        setList(sortedList);

        const selectedTask = sortedList.find((task) => task.id === taskId);

        if (selectedTask) {
          setTitle(selectedTask.title);
          setDescription(selectedTask.description);
        }
      } else {
        setList([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: deleteData,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const updateData = async () => {
    try {
      await firebase.app().database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/').ref(`todo/${taskId}`).update({
        title,
        description,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      });

      Alert.alert('Task updated successfully!');
      navigation.navigate("TaskViewScreen")
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deleteData = async () => {
    try {
      await firebase.app().database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/').ref(`todo/${taskId}`).set(null);

      Alert.alert('Task deleted successfully!');
      navigation.navigate("TaskViewScreen");
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const { container, text, inputStyle, button ,buttonStyle} = styles;

  useEffect(() => {
    fetchData();
    const taskRef = firebase.app().database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/').ref(`todo/${taskId}`);
    const onTaskValueChange = taskRef.on('value', fetchData);

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDelete}>
          <Text style={buttonStyle}>Continue</Text>
        </TouchableOpacity>
      ),
    });

    return () => taskRef.off('value', onTaskValueChange);
  }, [taskId]);

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
          <Button title="Delete Task" onPress={handleDelete} color="#f44336" />
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
  buttonStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: 'white',
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

