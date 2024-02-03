import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import VectorImage from 'react-native-vector-image';
import Calendar from 'components/Calendar';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';

interface IProps {}

const TaskViewScreen: FC<IProps> = () => {
  const [selected, setSelected] = useState<any>('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState<any[]>([]);

  const handleSearchIconPress = () => {
    setIsSearchActive(!isSearchActive);
  };

  const navigation = useNavigation<any>();

  const handleCardPress = (task: any) => {
    navigation.navigate('TaskDetailScreen', {
      task,
      onDelete: () => handleDelete(task.id), // Pass a function to delete the specific task
      onUpdate: fetchData,
    });
  };
  
  const handleUpdate = (task: any) => {
    try {
      // Navigate to the TaskDetailScreen with the task object for updating
      navigation.navigate('TaskDetailScreen', {
        task,
        onUpdate: async (updatedTask: any) => {
          // Update the task in the database
          const taskRef = firebase
            .app()
            .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`todo/${updatedTask.id}`);
  
          await taskRef.update(updatedTask);
  
          // Update the task in the local state (list)
          setList((prevList) =>
            prevList.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
          );
  
          Alert.alert('Task updated successfully!');
        },
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const taskRef = firebase
        .app()
        .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref(`todo/${taskId}`);
  
      // Remove the task from the database
      await taskRef.set(null);
  
      // Remove the task from the local state (list)
      setList((prevList) => prevList.filter((task) => task.id !== taskId));
  
      Alert.alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
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
    buttonContainer,
    updateButton,
    deleteButton,
    buttonText,
    cardContent,
    cardText,
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
      
      {list.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text>No tasks added</Text>
        </View>
      ) : (
        list.map((task) => (
          <TouchableOpacity key={task.id} onPress={() => handleCardPress(task)}>
            <View style={[card, { backgroundColor: 'purple' }]}>
              <View style={cardContent}>
                <Text style={[cardText, { color: 'white', fontSize: 18, fontWeight: 'bold' }]}>
                  Heading: {task.title}
                </Text>
                <Text style={[cardText, { color: 'white' }]}>
                  Selected Date: {task.selectedDate}
                </Text>
                <Text style={[cardText, { color: 'white' }]}>
                  Description: {task.description}
                </Text>
              </View>
              <View style={buttonContainer}>
                <TouchableOpacity style={updateButton} onPress={() => handleUpdate(task.id)}>
                  <Text style={buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={deleteButton} onPress={() => handleDelete(task.id)}>
                  <Text style={buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'purple',
    padding: 16,
    height:200,
  },
  cardContent: {
    flex: 1,
  },
  cardText: {
    marginBottom: 8,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default TaskViewScreen;