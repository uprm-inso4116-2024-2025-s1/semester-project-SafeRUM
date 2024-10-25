import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import AddReportModal from './AddReportModal'; 

interface MonthlyViewProps {
  selectedMonth: number;
  selectedYear: number;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  getReportsForDate: (date: Date) => string[];
  getReportsForMonth: (month: number, year: number) => { date: Date; reports: string[] }[];
  addReport: (date: Date, title: string, description: string) => void;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({
  selectedMonth,
  selectedYear,
  selectedDate,
  setSelectedDate,
  setCurrentView,
  getReportsForDate,
  getReportsForMonth,
  addReport
}) => {
  const [reportsVisible, setReportsVisible] = useState(false);
  const [reportsForSelectedDate, setReportsForSelectedDate] = useState<string[]>([]);
  const [addReportVisible, setAddReportVisible] = useState(false);


  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  
  const handlePlusButtonPress = () => {
    setAddReportVisible(true);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const reportsForMonth = getReportsForMonth(selectedMonth, selectedYear);

  return (
    <View style={styles.monthView}>
      {/* Header with Back Arrow, Month Header, and Plus Button */}
      <View style={styles.headerContainer}>
        {/* Back Button with Arrow Icon */}
        <TouchableOpacity
          onPress={() => setCurrentView('yearly')}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>

        {/* Month and Year Header */}
        <Text style={styles.monthHeader}>
          {months[selectedMonth]} {selectedYear}
        </Text>

        {/* Plus Button */}
        <TouchableOpacity
          onPress={handlePlusButtonPress}
          style={styles.plusButton}
        >
          <Icon name="add" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
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
          renderItem={({ item }) => {
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
      <AddReportModal
        visible={addReportVisible}
        onClose={() => setAddReportVisible(false)}
        onAddReport={(date, title, description) => {
          addReport(date, title, description);
          setAddReportVisible(false);
        }}
      />

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
              <View style={styles.noReportsContainer}>
                <Text style={styles.noReportsText}>No reports available for this date.</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Reports List Below Calendar */}
      <View style={styles.reportsContainer}>
        <Text style={styles.reportsHeader}>Reports</Text>
        {reportsForMonth.length > 0 ? (
          <FlatList
            data={reportsForMonth}
            keyExtractor={(item) => item.date.toString()}
            renderItem={({ item }) => {
              const date = item.date;
              const reports = item.reports;
            
              const monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
              ];
              const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
            
              // Format the date for the current item
              return(
              <View style={styles.reportItem}>
                <Text style={styles.reportDate}>{formattedDate}</Text>
                {item.reports.map((report, index) => (
                  <Text key={index} style={styles.reportText}>
                    • {report}
                  </Text>
                ))}
              </View>
        )}}
          />
        ) : (
          <Text style={styles.noReportsText}>No reports available for this month.</Text>
        )}
      </View>
    </View>
  );
};

export default MonthlyView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#f9f9f9',
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
    marginBottom: 20,
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
    width: 58, 
    height: 60, 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    borderBottomColor: '#0F8F46',
    borderBottomWidth: 1,
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedDay: {
    width: 58, 
    height: 60, 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    borderBottomColor: '#0F8F46',
    borderBottomWidth: 1,
  },
  selectedDayText: {
    color: '#0F8F46', 
    fontWeight: 'bold',
    
  },
  monthView: {
    flex: 1,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 2, 
    borderBottomColor: '#0F8F46',
    borderBottomWidth: 1,
    paddingTop: 15
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    width: 58, 
    textAlign: 'center', 
    paddingBottom: 7,
  },
  reportsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportText: {
    fontSize: 15,
    color: '#0F8F46',
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '40%'
  },
  closeButton: {
    fontSize: 16,
    color: '#0F8F46',
    textAlign: 'right',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10
  },
  noReportsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 100
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 10, 
  },
  backButton: {
    padding: 10,
  },
  plusButton: {
    padding: 10,
  },
  monthHeader: {
    fontSize: 24,
    fontWeight: '300',
    color: '#0F8F46',
    textAlign: 'center',
    flex: 1,
  },
  noReportsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  reportsContainer: {
    marginTop: 2,
    borderTopWidth: 0.5,
    borderTopColor: '#0F8F46',
  },
  reportsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 23,
    marginBottom: 10,
    color: '#0F8F46',
  },
  reportItem: {
    marginBottom: 15,
  },
  reportDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
