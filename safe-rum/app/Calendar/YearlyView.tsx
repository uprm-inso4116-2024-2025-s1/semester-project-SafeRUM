import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface YearlyViewProps {
  selectedYear: number;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const YearlyView: React.FC<YearlyViewProps> = ({ 
  selectedYear, 
  selectedDate, 
  setSelectedDate, 
  setSelectedMonth, 
  setCurrentView 
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
                    onPress={() =>
                      setSelectedDate(new Date(selectedYear, index, item))
                    }
                  >
                    <View style={styles.dayContainer}>
                      <View style={isSelected ? styles.selectedDay : null}>
                        <Text style={isSelected ? null : styles.dayText}>
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
    marginBottom: 10,
  },
  yearView: {
    marginBottom: 20,
  },
  yearText: {
    fontSize: 36,
    color: '#0F8F46',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monthContainer: {
    width: '33%',
    marginVertical: 12,
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
  selectedDay: {
    alignItems: 'center',
    justifyContent: 'center', 
    height: 19,
    width: 20, 
    backgroundColor: '#0F8F46',
    borderRadius: 20,
    color: '#fff',
  },
  dayContainer: {
    width: 19,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  monthView: {
    flex: 1,
  },
  monthHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  weekDayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  reportsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportText: {
    fontSize: 16,
    color: '#4CAF50',
    marginVertical: 5,
  },
});
