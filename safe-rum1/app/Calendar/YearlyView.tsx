import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface YearlyViewProps {
  selectedYear: number;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  setCalendarState: React.Dispatch<React.SetStateAction<boolean>>;
}

const YearlyView: React.FC<YearlyViewProps> = ({
  selectedYear,
  selectedDate,
  setSelectedDate,
  setSelectedMonth,
  setCurrentView,
  setCalendarState,
}) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return (
    <View style={styles.yearView}>
      <TouchableOpacity
        onPress={() => setCalendarState(false)}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={24} color="#337137" />
      </TouchableOpacity>
      <Text style={styles.yearText}>{selectedYear}</Text>
      <View style={styles.monthsContainer}>
        {months.map((month, index) => (
          <View key={index} style={styles.monthContainer}>
            <TouchableOpacity
              onPress={() => {
                setSelectedMonth(index);
                setCurrentView('monthly');
              }}
            >
              <Text style={styles.monthText}>{month}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default YearlyView;

const styles = StyleSheet.create({
  yearView: {
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  yearText: {
    fontSize: 36,
    color: '#337137',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 15,
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#337137',
  },
  monthContainer: {
    width: '32%',
    marginVertical: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
});