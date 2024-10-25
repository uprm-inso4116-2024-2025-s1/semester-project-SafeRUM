import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



interface YearlyViewProps {
  selectedYear: number;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  setCalendarState: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
}

const YearlyView: React.FC<YearlyViewProps> = ({ 
  selectedYear, 
  selectedDate, 
  setSelectedDate, 
  setSelectedMonth, 
  setCurrentView,
  setCalendarState
}) => {

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  return (
    <View style={styles.yearView}>
         <TouchableOpacity
            onPress={() => setCalendarState(false)}
            style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#4CAF50" />
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
            {/* Render days for each month */}
            <FlatList
              data={[...Array(getDaysInMonth(index, selectedYear)).keys()].map(
                (day) => day + 1
              )}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => {
                const isSelected =
                  selectedDate.getDate() === item &&
                  selectedDate.getMonth() === index &&
                  selectedDate.getFullYear() === selectedYear;

                return (
                  <TouchableOpacity
                  onPress={() => {
                    setSelectedMonth(index);
                    setCurrentView('monthly');
                  }}
                  >
                    <View style={styles.dayContainer}>
                      <View style={isSelected ? styles.selectedDay : null}>
                        <Text style={isSelected ? styles.selectedDayText : styles.dayText}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              numColumns={7}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default YearlyView;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 5,
  },
  yearView: {
    marginBottom: 20,
  },
  yearText: {
    fontSize: 36,
    color: '#0F8F46',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 15,
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#0F8F46'
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
  dayText: {
    fontSize: 12,
    margin: 0.5,
    textAlign: 'center',
  },
  selectedDayText:{
    fontSize: 12,
    margin: 0.5,
    textAlign: 'center',
    color: '#0F8F46',
    fontWeight: 'bold'
  },
  selectedDay: {
    alignItems: 'center',
    justifyContent: 'center', 
    height: 19,
    width: 25, 
  },
  dayContainer: {
    width: 17,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
