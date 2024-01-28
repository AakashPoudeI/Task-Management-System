import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import VectorImage from 'react-native-vector-image';
import Calendar from 'components/Calendar';
import { firebase } from '@react-native-firebase/database';

interface IProps {}

const TaskViewScreen: FC<IProps> = () => {
  const [selected, setSelected] = useState<any>('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);

  const handleSearchIconPress = () => {
    setIsSearchActive(!isSearchActive);
  };

  const navigation = useNavigation<any>();

  const handleCardPress = (task: any) => {
    navigation.navigate('TaskDetailScreen', {
      task,
      onDelete: fetchData, // Pass the fetchData callback function
    });
  };

  const handleDelete = async (taskId: string) => {
    try {
      // Set up real-time listener for the specific task being deleted
      const taskRef = firebase
        .app()
        .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref(`todo/${taskId}`);

      const onTaskValueChange = taskRef.on('value', (snapshot) => {
        fetchData(); // Call fetchData whenever the task data changes
      });

      // Remove the task from the database
      await taskRef.remove();

      // Stop listening for updates when no longer required
      taskRef.off('value', onTaskValueChange);

      // Show an alert or perform any other action after successful deletion
      Alert.alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    fetchData();

    // Set up real-time listener for tasks
    const tasksRef = firebase
      .app()
      .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('todo');

    const onTasksValueChange = tasksRef.on('value', (snapshot) => {
      fetchData(); // Call fetchData whenever the tasks data changes
    });

    // Stop listening for updates when no longer required
    return () => tasksRef.off('value', onTasksValueChange);
  }, []);

  const fetchData = () => {
    try {
      const tasksRef = firebase
        .app()
        .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('todo');
  
      tasksRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const listArray: { id: string; selectedDate: string }[] = Object.values(data);
  
          // Sort the array chronologically based on the selectedDate
          const sortedList = listArray.sort((a, b) => {
            const dateA = new Date(a.selectedDate).getTime();
            const dateB = new Date(b.selectedDate).getTime();
            return dateA - dateB;
          });
  
          setList(sortedList);
        } else {
          // No data found
          setList([]);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const {
    container,
    headerStyle,
    svgStyle,
    svgContainer,
    iconStyle,
    searchContainer,
    textInputStyle,
    searchStyle,
    card,
    iconContainer,
  } = styles;

  return (
    <ScrollView style={container}>
      <View style={headerStyle}>
        {!isSearchActive && (
          <>
            <View style={svgContainer}>
              <VectorImage
                source={require('../assets/images/tasks-boss-svgrepo-com.dark.svg')}
                style={svgStyle}
              />
            </View>
          </>
        )}
        <View style={searchStyle}>
          <TouchableOpacity onPress={handleSearchIconPress} style={iconContainer}>
            <FeatherIcon name="search" style={iconStyle} />
          </TouchableOpacity>
        </View>
        {isSearchActive && (
          <View style={searchContainer}>
            <TextInput
              style={textInputStyle}
              placeholder="Search..."
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
        )}
      </View>

      <Calendar onSelectDate={setSelected} selected={selected} />
      {list.map((task) => (
        <TouchableOpacity key={task.id} onPress={() => handleCardPress(task)}>
          <View style={card}>
            <Text>Heading: {task.title}</Text>
            <Text>Selected Date: {task.selectedDate}</Text>
            <Text>Description: {task.description}</Text>
            <TouchableOpacity onPress={() => handleDelete(task.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'purple',
    height: 100,
  },
  headerStyle: {
    marginTop: 30,
    marginHorizontal: 10,
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  searchStyle: {
    flexDirection: 'row',
  },
  textInputStyle: {
    fontSize: 16,
    flex: 1,
    marginLeft: -300,
    backgroundColor: 'grey',
    borderRadius: 10,
    height: 50,
  },
  svgStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 40,
    height: 40,
  },
  svgContainer: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
  },
  iconStyle: {
    fontSize: 25,
    color: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 9,
    marginRight: 2.5,
  },
  iconContainer: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default TaskViewScreen;