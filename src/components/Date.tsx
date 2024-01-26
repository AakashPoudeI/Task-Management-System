import React, { FC } from 'react'

interface IProps {
    date: string; // Assuming 'date' is a string, you can adjust the type accordingly
    onSelectDate: (date: string) => void; // Assuming onSelectDate is a function that takes a string parameter
    selected: boolean;
  
}

/**
* @author
* @function @Date

**/
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'

const Date: FC<IProps> = ({ date, onSelectDate, selected }) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const day = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd')
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format('D')

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD')
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[styles.card, selected.toString() === fullDate && { backgroundColor: "#6146c6" }]}
    >
      <Text
        style={[styles.big, selected === true && { color: "#fff" }]}
      >
        {day}
      </Text>
      <View style={{ height: 10 }} />
      <Text
        style={[
          styles.medium,
          selected.toString() === fullDate && { color: "black", fontWeight: 'bold', fontSize: 24 },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  card: {
    backgroundColor: 'slategray',
    borderRadius: 10,
    borderColor: 'black',
    padding: 10,

    alignItems: 'center',
    height: 90,
    width: 80,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  medium: {
    fontSize: 18,
  },
})


 

export default Date;