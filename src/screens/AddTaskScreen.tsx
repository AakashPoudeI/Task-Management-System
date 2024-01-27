import React, {FC, useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';
import VectorImage from 'react-native-vector-image';

interface IProps {}

const AddTaskScreen: FC<IProps> = props => {
  const [task, setTask] = useState<string>('');
  const [heading, setHeading] = useState<string>('');
  const [subHeading, setSubHeading] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

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

  const handleAddTask = () => {
    
    
    console.log('Heading:', heading);
    console.log('Subheading:', subHeading);
    console.log('Task:', task);
    console.log('Selected Date:', selectedDate);
    
  };

  const [selected, setSelected] = useState<any>('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const route = useRoute<any>();
  const selecteImage = route.params?.selectedImage;

  const {
    container,
    headerContainer,
    headerText,
    inputContainer,
    inputStyle,
    subheadingContainer,
    subheadingInputStyle,
    descriptionInputStyle,
    buttonContainer,
    createTaskButton,
    dateButton,
    iconContainer,
    iconStyle,
    screenHeading,
    textStyle,
    imageContainer,
    svgContainer,
    svgStyle,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <View style={screenHeading}>
        <View style={iconContainer}>
          <FeatherIcon name="arrow-left-circle" style={iconStyle} />
        </View>
        <Text style={[textStyle, {fontSize: 36}]}>Create Task</Text>
      </View>
      {!isSearchActive && (
        <>
          {!selecteImage && (
            <View style={svgContainer}>
              <VectorImage
                source={require('../assets/images/tasks-boss-svgrepo-com.dark.svg')}
                style={svgStyle}
              />
            </View>
          )}
          <View style={imageContainer}>
            {selecteImage && selecteImage.path && (
              <Image source={{uri: selecteImage.path}} style={svgStyle} />
            )}
          </View>
        </>
      )}
      <View style={headerContainer}>
        <Text style={headerText}>Add Task</Text>
      </View>
      <View style={inputContainer}>
        <TextInput
          style={inputStyle}
          placeholder="Enter Heading"
          value={heading}
          onChangeText={text => setHeading(text)}
        />
      </View>
      <View style={subheadingContainer}>
        <TextInput
          style={subheadingInputStyle}
          placeholder="Enter Subheading"
          value={subHeading}
          onChangeText={text => setSubHeading(text)}
        />
      </View>
      <View style={inputContainer}>
        <TextInput
          style={descriptionInputStyle}
          placeholder="Enter Task Description"
          value={task}
          onChangeText={text => setTask(text)}
        />
      </View>
      <TouchableOpacity style={dateButton} onPress={showDatePicker}>
        <Text>Select Date</Text>
      </TouchableOpacity>
      {selectedDate && (
        <Text>Selected Date: {selectedDate.toISOString().split('T')[0]}</Text>
      )}
      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleConfirm}
        />
      )}
      <View style={buttonContainer}>
        <TouchableOpacity style={createTaskButton} onPress={handleAddTask}>
          <Text style={{fontSize: 18}}>Create Task</Text>
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
  headerContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    borderColor: 'black',
    borderRadius: 65,

    width: 50,
    height: 50,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue', 
  },
  svgStyle: {
    height: 25,

    width: 25,
    marginTop: 8,
    marginRight: 1,
    borderRadius: 100,
  },
  image: {
    marginTop: 20,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  svgContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 65,
    marginLeft: 10,
    backgroundColor: 'white',
    width: 50,
    height: 50,

    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
  },
  subheadingContainer: {
    width: '80%',
    marginVertical: 10,
  },
  textStyle: {
    color: 'black',
    fontFamily: 'Times New Roman',
    fontWeight: '500',
  },
  subheadingInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 18, 
  },
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16, 
  },
  descriptionInputStyle: {
    height: 80, 
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 14, 
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  createTaskButton: {
    backgroundColor: 'green', 
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  dateButton: {
    backgroundColor: 'yellow', 
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  screenHeading: {
    flexDirection: 'row',
    marginVertical: 20,
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
});

export default AddTaskScreen;
