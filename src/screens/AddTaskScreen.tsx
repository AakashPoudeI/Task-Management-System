import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import VectorImage from 'react-native-vector-image';
import { firebase } from '@react-native-firebase/database';

interface IProps {}

const AddTaskScreen: FC<IProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Date | any>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [title, setTitle] = useState<any>(null);
  const [description, setDescription] = useState<any>(null);
  const [list,setList]=useState<any[]>([]);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const selectedImage = route.params?.selectedImage;
  const FirstName = route.params?.FirstName;
  const LastName = route.params?.LastName;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event: any, date?: Date | undefined) => {
    if (date) {
      const currentDate = new Date();
      if (date < currentDate) {
        Alert.alert('Invalid Date', 'Please select a future date and time.');
      } else {
        setSelectedDate(date);
      }
    }
    hideDatePicker();
  };

  const handleAddTask = async () => {
    try {
      // Get the current index
      const indexSnapshot = await firebase
        .app()
        .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('todo/index')
        .once('value');
  
      let index = indexSnapshot.val() || 0;
  
      // Increment the index for the new task
      index++;
  
      // Update the index in Firebase
      await firebase
        .app()
        .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('todo/index')
        .set(index);
  
      // Add the new task with the updated index
      await firebase
        .app()
        .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref(`todo/${index}`)
        .set({
          title: title,
          description: description,
          selectedDate: selectedDate.toISOString(),
        });
  
      // Set up a real-time listener for the updated data
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
  
          // Update the local state to include the new task
          setList(sortedList);
        } else {
          // No data found
          setList([]);
        }
      });
  
      console.log('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      Alert.alert('Error', 'Failed to add task. Check console for details.');
    }
  };
  

  useEffect(() => {
    // Set up real-time listener for tasks
    const tasksRef = firebase
      .app()
      .database('https://taskblaze-d5705-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('todo');

    const onTasksValueChange = tasksRef.on('value', () => {
      // Trigger a rerender or update the local state when tasks change
      route.params?.onDataChange && route.params?.onDataChange();
    });

    // Stop listening for updates when no longer required
    return () => tasksRef.off('value', onTasksValueChange);
  }, [route.params?.onDataChange]);

  const {
    container,
    headerContainer,
    headerText,
    inputContainer,
    inputStyle,
    descriptionInputStyle,
    buttonContainer,
    createTaskButton,
    iconContainer,
    iconStyle,
    screenHeading,
    textStyle,
    imageContainer,
    svgContainer,
    svgStyle,
    profileContainer,
    infoStyle,
    configureContainer,
    assignStyle,
    assignStyle2,
    icon2Container,
    icon2Style,
    dateInfoContainer,
    dateShowContainer,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <View style={screenHeading}>
        <View style={iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('TaskViewScreen')}>
            <FeatherIcon name="arrow-left-circle" style={iconStyle} />
          </TouchableOpacity>
        </View>
        <Text style={[textStyle, { fontSize: 36 }]}>Create Task</Text>
      </View>
      <View style={configureContainer}>
        <View style={profileContainer}>
          <>
            {!selectedImage ? (
              <View style={svgContainer}>
                <VectorImage
                  source={require('../assets/images/tasks-boss-svgrepo-com.dark.svg')}
                  style={svgStyle}
                />
              </View>
            ) : (
              <View style={imageContainer}>
                {selectedImage && selectedImage.path && (
                  <Image source={{ uri: selectedImage.path }} style={svgStyle} />
                )}
              </View>
            )}
          </>
          <View style={infoStyle}>
            <Text style={assignStyle}>Assigned To:</Text>
            <Text style={assignStyle2}>
              {FirstName} {LastName}
            </Text>
          </View>
        </View>
        <View style={dateInfoContainer}>
          <View style={icon2Container}>
            <TouchableOpacity>
              <FeatherIcon
                name="calendar"
                size={30}
                color="black"
                style={icon2Style}
                onPress={showDatePicker}
              />
            </TouchableOpacity>
          </View>
          <View style={dateShowContainer}>
            <Text style={assignStyle}>Due Date</Text>
            {selectedDate && (
              <Text style={assignStyle2}>
                {selectedDate.toISOString().split('T')[0]}
              </Text>
            )}
            {isDatePickerVisible && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="default"
                onChange={handleConfirm}
              />
            )}
          </View>
        </View>
      </View>
      <View style={headerContainer}>
        <Text style={headerText}>Add Task</Text>
      </View>
      <View style={inputContainer}>
        <Text style={[textStyle, { fontSize: 18, marginBottom: 5, color: 'black' }]}>Task Title:</Text>
        <TextInput
          style={inputStyle}
          placeholder="Enter Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={inputContainer}>
        <Text style={[textStyle, { fontSize: 18, marginBottom: 5, color: 'black' }]}>Task Description:</Text>
        <TextInput
          style={descriptionInputStyle}
          placeholder="Enter Task Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      <View style={buttonContainer}>
        <TouchableOpacity style={createTaskButton} onPress={handleAddTask}>
          <Text style={{ fontSize: 18, color: 'white' }}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
 
  imageContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 65,
    marginLeft: 10,
    backgroundColor: 'white',
    width: 100,
    height: 100,

    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  svgStyle: {
    height: 55,

    width: 55,
    marginTop: 8,
    marginRight: 1,
    borderRadius: 50,
  },
  svgContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 65,
    marginLeft: 10,
    backgroundColor: 'white',
    width: 80,
    height: 80,

    alignItems: 'center',
  },
  
 
  
  
 
  
  
 
  screenHeading: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 80,
    marginLeft: 20,
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
    marginRight: 60,
  },
  profileContainer: {
    flexDirection: 'row',
    marginRight: 14,
  },
  infoStyle: {
    flexDirection: 'column',
    marginLeft:4
  },
  configureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assignStyle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'black',
  },
  assignStyle2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  icon2Style: {
    fontSize: 40,
    color: 'black',
    alignSelf: 'center',

    marginTop: 15,
    borderRadius: 50,
  },
  icon2Container: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 60,
  },
  dateInfoContainer: {
    flexDirection: 'row',
  },
  dateShowContainer:{
    marginLeft:-52,
    alignSelf:'center',
    marginRight:20,
    flexDirection:'column'
  },
  headerContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop:40 
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 20, // Added padding
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  inputStyle: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 20,
    marginBottom: 10,
    fontWeight:'600',
    color:"black"
  },
  descriptionInputStyle: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    color:"black",
    fontWeight:"400",
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20, // Added padding
  },
  createTaskButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});


export default AddTaskScreen;


