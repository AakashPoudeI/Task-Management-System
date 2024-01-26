import {NavigationContainer, useNavigation, useRoute} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TextInputBase,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WIDTH, HEIGHT} from 'utils/dimension';

interface IProps {}

/**
 * @author
 * @function @loginScreen
 **/

const LoginPasswordScreen: FC<IProps> = props => {
  const [password, setPassword] = useState('');
  const route=useRoute<any>();
  const email=route.params?.email|| ""
  const navigation = useNavigation<any>();
  const {
    container,
    textStyle,
    headingText,
    subhead,
    headingTextView,
    askView,
    askView1,
    button,
    subhead1,
    enterText,
    enterTextStyle,
    buttonStyle,
  } = styles;
  return (
    <SafeAreaView style={container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUpScreen' )}>
        <Text style={textStyle}>Create Account</Text>
      </TouchableOpacity>
      <View style={headingTextView}>
        <Text style={headingText}>Log In</Text>
      </View>
      <View style={askView}>
        <Text style={subhead}>Using {email} to log in</Text>
      </View>
      <View style={askView1}>
        <Text style={subhead1}>YOUR PASSWORD</Text>
      </View>
      <View style={enterText}>
        <TextInput
          style={enterTextStyle}
          placeholder="Your Password Here"
          secureTextEntry={true}
          placeholderTextColor="lightgrey"
          underlineColorAndroid="black"
          multiline={false}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity
        style={button}
        onPress={() => navigation.navigate('TaskViewScreen' )}>
        <Text style={buttonStyle}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
    fontFamily: 'Times New Roman',
    fontSize: 20,
    textAlign: 'justify',
    textDecorationLine: 'underline',
    marginLeft: 219,
    marginTop: 80,
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
    textTransform: 'lowercase',
  },
  askView: {
    height: 'auto',
    width: 'auto',
    justifyContent: 'center',
    marginLeft: 30,
    marginTop: 20,
    textTransform:"lowercase"
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
    fontWeight: '400',
    textTransform: 'lowercase',
  },
  enterTextStyle: {
    color: 'black',
    fontWeight: '500',
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

export default LoginPasswordScreen;
