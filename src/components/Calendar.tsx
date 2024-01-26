import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import moment, {Moment} from 'moment';
import DateComponent from './Date';

interface IProps {
  onSelectDate: (date: string) => void;
  selected: boolean;
}

const Calendar: FC<IProps> = ({onSelectDate, selected}) => {
  const [dates, setDates] = useState<Moment[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState<any>();
  const getCurrentMonth = () => {
    const month = moment(dates[0])
      .add(scrollPosition / 60, 'days')
      .format('MMMM');
    setCurrentMonth(month);
  };

  useEffect(() => {
    getCurrentMonth();
  }, [scrollPosition]);

  const [currentYear, setCurrentYear] = useState<number | undefined>();

  const getCurrentMonthAndYear = () => {
    const firstDate = moment(dates[0]);
    const scrolledDate = firstDate.add(scrollPosition / 60, 'days');

    const month = scrolledDate.format('MMMM');
    const year = scrolledDate.format('YYYY');

    setCurrentMonth(month);
    setCurrentYear(Number(year));
  };

  useEffect(() => {
    getCurrentMonthAndYear();
  }, [scrollPosition]);

  // ...

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates: Moment[] = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days');
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  return (
    <>
      <View style={styles.centered}>
        <Text style={styles.title}>
          {currentMonth}, {currentYear}
        </Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.x)}>
            {dates.map((date, index) => (
              <DateComponent
                key={index}
                date={date.format('YYYY-MM-DD')}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  dateSection: {
    width: '100%',
    padding: 20,
  },
  scroll: {
    height: 150,
  },
});
