import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import YearlyView from './YearlyView';
import MonthlyView from './MonthlyView';

interface CalendarPageProps {
  setCalendarState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CalendarPage({setCalendarState} : CalendarPageProps) {
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

  const getReportsForMonth = (month: number, year: number): { date: Date; reports: string[] }[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const reportsForMonth = [];
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const reports = getReportsForDate(date);
      if (reports.length > 0) {
        reportsForMonth.push({ date, reports });
      }
    }
  
    return reportsForMonth;
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
          setCalendarState={setCalendarState} 
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
          getReportsForMonth={getReportsForMonth}
          addReport={getReportsForDate}
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