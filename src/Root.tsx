
import React, {FC} from 'react';
import SignUpScreen from 'screens/SignUpScreen';
import LoginEmailScreen from 'screens/LoginEmailScreen';
import UserInfoScreen from 'screens/UserInfoScreen';
import StackNav from 'navigation/StackNav';
import TaskViewScreen from 'screens/TaskViewScreen';

interface IProps {}

/**
* @author Bishwas Z. Khanal
* @function @Root

**/

const Root: FC<IProps> = props => {
 
  return (
    <StackNav/>
  );
};



export default Root;
