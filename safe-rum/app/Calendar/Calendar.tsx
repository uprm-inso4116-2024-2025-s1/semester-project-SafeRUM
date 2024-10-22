import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import YearlyView from './YearlyView';
import MonthlyView from './MonthlyView';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('yearly'); // 'yearly' or 'monthly'
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());


  // Sample reports data
  const reportsData: { [key: string]: string[] } = {
    '2024-10-21': ['Report 1', 'Report 2'],
    '2024-10-22': ['Report 3'],
    // Add more dates and reports as needed
  };

  // Function to get reports for a specific date
  const getReportsForDate = (date: Date): string[] => {
    const dateString = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    return reportsData[dateString] || [];
  };

  return (
    <View style={styles.container}>
      {currentView === 'yearly' && (
        <YearlyView
          selectedYear={selectedYear}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setSelectedMonth={setSelectedMonth}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === 'monthly' && (
        <MonthlyView
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setCurrentView={setCurrentView}
          getReportsForDate={getReportsForDate} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
});
