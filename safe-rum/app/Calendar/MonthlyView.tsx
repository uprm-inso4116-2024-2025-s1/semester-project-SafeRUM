import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';

interface MonthlyViewProps {
  selectedMonth: number;
  selectedYear: number;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  getReportsForDate: (date: Date) => string[];
}

const MonthlyView: React.FC<MonthlyViewProps> = ({
  selectedMonth,
  selectedYear,
  selectedDate,
  setSelectedDate,
  setCurrentView,
  getReportsForDate,
}) => {
  const [reportsVisible, setReportsVisible] = useState(false);
  const [reportsForSelectedDate, setReportsForSelectedDate] = useState<string[]>([]);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  return (
    <View style={styles.monthView}>
      <TouchableOpacity onPress={() => setCurrentView('yearly')}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.monthHeader}>
        {months[selectedMonth]} {selectedYear}
      </Text>
      <View style={styles.calendarContainer}>
        {/* Days of the week */}
        <View style={styles.weekDays}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Text key={index} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* FlatList for Calendar dates */}
        <FlatList
          data={[...Array(getDaysInMonth(selectedMonth, selectedYear)).keys()].map(
            (day) => day + 1
          )}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => {
            const isSelected =
              selectedDate.getDate() === item &&
              selectedDate.getMonth() === selectedMonth &&
              selectedDate.getFullYear() === selectedYear;
              

            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    const date = new Date(selectedYear, selectedMonth, item);
                    setSelectedDate(date);
                    const reports = getReportsForDate(date);
                    setReportsForSelectedDate(reports);
                    setReportsVisible(true);
                  }}
                >
                  <View style={isSelected ? styles.selectedDay : styles.dayContainer}>
                    <Text
                      style={[
                        styles.dayText,
                        isSelected ? styles.selectedDayText : null
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          numColumns={7} // To ensure each row has 7 columns
        />
      </View>

      {/* Modal for Reports */}
      <Modal
        visible={reportsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setReportsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => { setReportsVisible(false); setSelectedDate(new Date()); }}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.reportsTitle}>Reports for {selectedDate.toDateString()}:</Text>
            {reportsForSelectedDate.length > 0 ? (
              reportsForSelectedDate.map((report, index) => (
                <Text key={index} style={styles.reportText}>
                  {report}
                </Text>
              ))
            ) : (
              <Text style={styles.noReportsText}>No reports available for this date.</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MonthlyView;

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
    width: '25%',
    alignItems: 'center',
    marginVertical: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    padding: 8,
   
  },
  dayWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 5, 
    marginRight: 15,
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5, 
    marginRight: 15,
  },
  selectedDayText: {
    color: '#0F8F46', 
    fontWeight: 'bold',
  },
  monthView: {
    flex: 1,
  },
  monthHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    paddingBottom: 20,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5, 
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    width: 40, 
    textAlign: 'center', 
    paddingBottom: 7,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeButton: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'right',
    marginBottom: 10,
  },
  noReportsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
