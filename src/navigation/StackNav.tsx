import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginEmailScreen from 'screens/LoginEmailScreen';
import LoginPasswordScreen from 'screens/LoginPasswordScreen';
import SignUpScreen from 'screens/SignUpScreen';
import UserInfoScreen from 'screens/UserInfoScreen';
import TaskViewScreen from 'screens/TaskViewScreen';

interface IProps {}

/**
 * @author
 * @function @stack
 **/

const StackNav: FC<IProps> = props => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Email'>
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginEmailScreen"
          component={LoginEmailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginPasswordScreen"
          component={LoginPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TaskViewScreen"
          component={TaskViewScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserInfoScreen"
          component={UserInfoScreen}
          options={{
            headerShown: false,
          }}
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
