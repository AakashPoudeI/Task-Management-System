import React, {FC, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Calendar from 'components/Calendar';



interface IProps {}

/**
 * @author
 * @function @TaskViewScreen
 **/

const TaskViewScreen: FC<IProps> = props => {
  const [selected, setSelected] = useState<any>('');
  

  const {container, headerStyle,} = styles;
  return (
    <View style={container}>
      <View style={headerStyle}>
     
      <FeatherIcon
                name="at-sign"
                size={30}
                
              />
        
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
    marginHorizontal: 25,
    height: 80,
    backgroundColor: 'cyan',
  },
  
});

export default TaskViewScreen;
