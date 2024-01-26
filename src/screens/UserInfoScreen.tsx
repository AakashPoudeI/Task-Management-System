import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import {WIDTH} from 'utils/dimension';

import ImagePicker from 'react-native-image-crop-picker';

import VectorImage from 'react-native-vector-image';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface IProps {}

/**
 * @author
 * @function @userinfo
 **/

const UserInfoScreen: FC<IProps> = props => {
 
  const [Firstname,setFisrtName]=useState<any>();
  const [Lastname,setLastName]=useState<any>();
  const navigation= useNavigation<any>();
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleImageUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
      });

      setSelectedImage(image);
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };
  const {
    container,
    imageView,
    svgStyle,
    askView1,
    enterText,
    enterTextStyle,
    subhead1,
    button,
    buttonStyle,
    svgContainer,
    image
  } = styles;
  return (
    <KeyboardAwareScrollView style={container}>
      <View style={svgContainer}>
        <VectorImage
          source={require('../assets/images/tasks-boss-svgrepo-com.dark.svg')}
          style={svgStyle}
        />
      </View>

      <View style={imageView}>
        <TouchableOpacity>
          <Text  onPress={handleImageUpload} style={imageView}>Upload Image</Text>
        </TouchableOpacity>
        {selectedImage && selectedImage.path && (
    <Image
      source={{ uri: selectedImage.path }}
      style={image}
    />
  )}
      </View>
      <View style={askView1}>
        <Text style={subhead1}>FIRST NAME</Text>
      </View>
      <View style={enterText}>
        <TextInput
          style={enterTextStyle}
          underlineColorAndroid="black"
          onChangeText={text=>setFisrtName(text)}
          value={Firstname}
        />
      </View>
      <View style={askView1}>
        <Text style={subhead1}>LAST NAME</Text>
      </View>
      <View style={enterText}>
        <TextInput style={enterTextStyle} 
        onChangeText={text=>setLastName(text)}
        value={Lastname}
        underlineColorAndroid="black" />
      </View>
      <TouchableOpacity
        style={
          button
        } onPress={()=> navigation.navigate('TaskViewScreen')}
      >
        <Text style={buttonStyle}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  svgContainer: {
    marginTop: 40,
    borderColor: 'red',
    borderRadius: 65,

    backgroundColor: 'cyan',
    width: 130,
    height: 130,
    alignSelf: 'center',
    alignItems: 'center',
  },
  svgStyle: {
    height: 80,

    width: 80,
    marginVertical: 15,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  textStyle: {
    color: 'black',
    fontFamily: 'Times New Roman',
    fontSize: 20,
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginRight: 30,
    marginTop: 50,
    marginBottom: 30,
  },

  headingTextView: {
    height: 'auto',
    width: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 30,
    marginTop: 50,
  },
  headingText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 45,
    fontWeight: '500',
  },
  subhead: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '300',
    textTransform: 'capitalize',
  },
  askView: {
    height: 'auto',
    width: 'auto',
    justifyContent: 'center',
    marginLeft: 30,
    marginTop: 20,
  },
  askView1: {
    height: 'auto',
    width: 'auto',
    marginLeft: 30,
    marginTop: 50,
  },
  button: {
    justifyContent: 'center',
    marginLeft: 50,
    marginTop: 50,
    backgroundColor: 'royalblue',
    width: WIDTH - 100,
    borderRadius: 25,
    textDecorationLine: 'underline',
    height: 70,
    alignItems: 'center',
  },
  subhead1: {
    fontSize: 16,
    color: 'black',
    justifyContent: 'center',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  enterText: {
    marginTop: 25,
    width: 350,
    marginLeft: 25,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  enterTextStyle: {
    color: 'black',
    fontWeight: '400',
    fontSize: 20,
    textTransform: 'lowercase',
  },
  buttonStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: 'white',
  },
});
export default UserInfoScreen;
