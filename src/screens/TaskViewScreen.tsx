import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Image,TextInput,TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';

import Calendar from 'components/Calendar';
import VectorImage from 'react-native-vector-image';
import ImageCropPicker from 'react-native-image-crop-picker';
interface IProps {}

/**
 * @author
 * @function @TaskViewScreen
 **/

const TaskViewScreen: FC<IProps> = props => {
  const [selected, setSelected] = useState<any>('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchIconPress = () => {
    setIsSearchActive(!isSearchActive);
  };

  const route = useRoute<any>();
  const selecteImage = route.params?.selectedImage;

  const {
    container,
    headerStyle,
    svgStyle,
    svgContainer,
    iconStyle,
    imageContainer,
    iconContainer,
    searchContainer,
    textInputStyle,
    searchStyle
  } = styles;
  return (
    <View style={container}>
      <View style={headerStyle}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerStyle: {
    marginTop: 40,
    marginHorizontal: 10,
    height: 80,
    backgroundColor: 'aqua',
    flexDirection: 'row',
  },
  searchContainer: {
    borderBottomWidth: 1,
    borderColor: 'black',
    height: 40, // Adjust the height according to your design
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10, // Add padding for the text input
    backgroundColor: 'white', // Background color for the search container
    marginTop: 15,
    marginLeft: -250,
    width: 200,
    borderRadius: 5,
  },
  searchStyle:{
    flexDirection:"row"
  },
  textInputStyle: {
    fontSize: 16,
    flex: 1, // Allow the text input to take up the remaining space
    marginLeft: 8,
    
  },
  svgStyle: {
    height: 25,

    width: 25,
    marginTop: 8,
    marginRight: 1,
    borderRadius: 100,
  },
  imageContainer: {
    borderColor: 'red',
    borderRadius: 65,

    width: 50,
    height: 50,
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  svgContainer: {
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 65,
    marginTop:15,

    backgroundColor: 'white',
    width: 50,
    height: 50,

    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 30,
    color: 'red',
    alignSelf:'center',
    marginTop:8,
    marginRight:2.5,
    
  },
  iconContainer: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 170,

    alignSelf: 'center',
  },
});

export default TaskViewScreen;
