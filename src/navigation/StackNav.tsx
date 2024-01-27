import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginEmailScreen from 'screens/LoginEmailScreen';
import LoginPasswordScreen from 'screens/LoginPasswordScreen';
import SignUpScreen from 'screens/SignUpScreen';
import UserInfoScreen from 'screens/UserInfoScreen';
import TaskViewScreen from 'screens/TaskViewScreen';
import AddTaskScreen from 'screens/AddTaskScreen';
import TabNav from './TabNav';

interface IProps {}

/**
 * @author
 * @function @stack
 **/

const StackNav: FC<IProps> = props => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='TabNav'>
      <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
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
          name="UserInfoScreen"
          component={UserInfoScreen}
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
          name="AddTaskScreen"
          component={AddTaskScreen}
          options={{
            headerShown: false,
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
