import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';

import Calendar from 'components/Calendar';
import VectorImage from 'react-native-vector-image';

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
    searchStyle,
  } = styles;
  return (
    <View style={container}>
      <View style={headerStyle}>
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
        <View style={searchStyle}>
          <TouchableOpacity
            onPress={handleSearchIconPress}
            style={iconContainer}>
            <FeatherIcon name="search" style={iconStyle} />
          </TouchableOpacity>
        </View>
        {isSearchActive && (
          <View style={searchContainer}>
            <TextInput
              style={textInputStyle}
              placeholder="Search..."
              value={searchText}
              onChangeText={text => setSearchText(text)}
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
    
    
    left: 0,
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
    height: 25,

    width: 25,
    marginTop: 8,
    marginRight: 1,
    borderRadius: 100,
  },
  imageContainer: {
    borderColor: 'black',
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
    borderWidth: 1,
    borderRadius: 65,
    marginLeft: 10,
    backgroundColor: 'white',
    width: 50,
    height: 50,

    alignItems: 'center',
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
