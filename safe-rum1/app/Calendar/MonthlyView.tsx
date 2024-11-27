import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddReportModal from './AddReportModal';
import EditReportModal from './EditReportModal';

interface Report {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface MonthlyViewProps {
  selectedMonth: number;
  selectedYear: number;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
  getReportsForDate: (date: Date) => Report[];
  getReportsForMonth: (month: number, year: number) => Report[];
  addReport: (date: Date, title: string, description: string) => void;
  editReport: (id: string, title: string, description: string) => void;
  deleteReport: (id: string) => void;
  reports: Report[];
}

const MonthlyView: React.FC<MonthlyViewProps> = ({
  selectedMonth,
  selectedYear,
  selectedDate,
  setSelectedDate,
  setCurrentView,
  getReportsForDate,
  getReportsForMonth,
  addReport,
  editReport,
  deleteReport,
  reports,
}) => {
  const [reportsVisible, setReportsVisible] = useState(false);
  const [reportsForSelectedDate, setReportsForSelectedDate] = useState<Report[]>([]);
  const [addReportVisible, setAddReportVisible] = useState(false);
  const [editReportVisible, setEditReportVisible] = useState(false);
  const [reportToEdit, setReportToEdit] = useState<Report | null>(null);

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

  const reportsForMonth = useMemo(() => {
    return getReportsForMonth(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear, reports]);
  

  useEffect(() => {
    const reportsOnDate = getReportsForDate(selectedDate);
    setReportsForSelectedDate(reportsOnDate);
  }, [selectedDate, reports]);  

  // Utility function to parse date strings to Date objects in local time
  const parseDateStringToLocalDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  return (
    <View style={styles.monthView}>
      {/* Header with Back Arrow, Month Header, and Plus Button */}
      <View style={styles.headerContainer}>
        {/* Back Button with Arrow Icon */}
        <TouchableOpacity
          onPress={() => setCurrentView('yearly')}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#337137" />
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
          <Icon name="add" size={24} color="#337137" />
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
            const date = new Date(selectedYear, selectedMonth, item);
            const isSelected =
              selectedDate.getDate() === item &&
              selectedDate.getMonth() === selectedMonth &&
              selectedDate.getFullYear() === selectedYear;

            const reportsOnDate = getReportsForDate(date);
            const hasReports = reportsOnDate.length > 0;

            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(date);
                    setReportsForSelectedDate(reportsOnDate);
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
                    {hasReports && <View style={styles.dot} />}
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
            <TouchableOpacity
              onPress={() => { setReportsVisible(false); setSelectedDate(new Date()); }}
            >
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.reportsTitle}>
              Reports for {selectedDate.toDateString()}:
            </Text>
            {reportsForSelectedDate.length > 0 ? (
              reportsForSelectedDate.map((report) => (
                <View key={report.id} style={styles.reportItem}>
                  <Text style={styles.reportText}>{report.title}</Text>
                  <View style={styles.reportActions}>
                    <TouchableOpacity
                      onPress={() => {
                        setReportToEdit(report);
                        setEditReportVisible(true);
                        setReportsVisible(false);
                      }}
                      style={styles.editButton}
                    >
                      <Icon name="pencil" size={20} color="#337137" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Delete Report',
                          'Are you sure you want to delete this report?',
                          [
                            { text: 'Cancel', style: 'cancel' },
                            {
                              text: 'Delete',
                              style: 'destructive',
                              onPress: () => deleteReport(report.id),
                            },
                          ],
                          { cancelable: true }
                        );
                      }}
                      style={styles.deleteButton}
                    >
                      <Icon name="trash" size={20} color="#ff0000" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noReportsContainer}>
                <Text style={styles.noReportsText}>
                  No reports available for this date.
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Edit Report Modal */}
      {reportToEdit && (
        <EditReportModal
          visible={editReportVisible}
          onClose={() => {
            setEditReportVisible(false);
            setReportToEdit(null);
          }}
          report={reportToEdit}
          onEditReport={(title, description) => {
            editReport(reportToEdit.id, title, description);
            setEditReportVisible(false);
            setReportToEdit(null);
          }}
        />
      )}

      {/* Reports List Below Calendar */}
      <View style={styles.reportsContainer}>
        <Text style={styles.reportsHeader}>Reports</Text>
        {reportsForMonth.length > 0 ? (
          <FlatList
            data={reportsForMonth}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const date = parseDateStringToLocalDate(item.date);
              const formattedDate = date.toLocaleDateString();

              return (
                <View style={styles.reportItem}>
                  <Text style={styles.reportDate}>{formattedDate}</Text>
                  <Text style={styles.reportText}>{item.title}</Text>
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.noReportsText}>
            No reports available for this month.
          </Text>
        )}
      </View>
    </View>
  );
};

export default MonthlyView;

const styles = StyleSheet.create({
  monthView: {
    flex: 1,
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
    color: '#337137',
    textAlign: 'center',
    flex: 1,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 2,
    borderBottomColor: '#337137',
    borderBottomWidth: 1,
    paddingTop: 15,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    width: 58,
    textAlign: 'center',
    paddingBottom: 7,
  },
  dayContainer: {
    width: 58,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#337137',
    borderBottomWidth: 1,
  },
  selectedDay: {
    width: 58,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e6f2e6',
    borderBottomColor: '#337137',
    borderBottomWidth: 1,
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedDayText: {
    color: '#337137',
    fontWeight: 'bold',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#337137',
    alignSelf: 'center',
    marginTop: 2,
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
    height: '40%',
  },
  closeButton: {
    fontSize: 16,
    color: '#337137',
    textAlign: 'right',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
  },
  reportsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportItem: {
    marginBottom: 15,
  },
  reportText: {
    fontSize: 15,
    color: '#337137',
    marginVertical: 5,
  },
  reportDate: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  reportActions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  editButton: {
    marginRight: 15,
  },
  deleteButton: {},
  noReportsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noReportsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 100,
  },
  reportsContainer: {
    marginTop: 2,
    borderTopWidth: 0.5,
    borderTopColor: '#337137',
  },
  reportsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 23,
    marginBottom: 10,
    color: '#337137',
  },
});