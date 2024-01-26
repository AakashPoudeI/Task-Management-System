import React, {FC, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WIDTH} from 'utils/dimension';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
