import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YearlyView from './YearlyView';
import MonthlyView from './MonthlyView';

interface Report {
  id: string;
  date: string; // ISO string with date and time
  title: string;
  description: string;
}

interface CalendarPageProps {
  setCalendarState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CalendarPage({ setCalendarState }: CalendarPageProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('monthly'); // 'yearly' or 'monthly'
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear());
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  const REPORTS_STORAGE_KEY = '@reports_key';

  // Utility function to format dates in 'YYYY-MM-DD' format
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // months are zero-indexed
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const saveReportsToStorage = async (reports: Report[]) => {
    try {
      const jsonValue = JSON.stringify(reports);
      await AsyncStorage.setItem(REPORTS_STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Failed to save reports to storage:', e);
    }
  };

  const loadReportsFromStorage = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem(REPORTS_STORAGE_KEY);
      if (jsonValue != null) {
        setReports(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load reports from storage:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReportsFromStorage();
  }, []);

  const addReport = async (date: Date, title: string, description: string) => {
    const newReport: Report = {
      id: Date.now().toString(),
      date: formatDate(date), // Store date as 'YYYY-MM-DD'
      title,
      description,
    };
    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    await saveReportsToStorage(updatedReports);
  };
  

  const editReport = async (id: string, title: string, description: string) => {
    const updatedReports = reports.map((report) =>
      report.id === id ? { ...report, title, description } : report
    );
    setReports(updatedReports);
    await saveReportsToStorage(updatedReports);
  };

  const deleteReport = async (id: string) => {
    const updatedReports = reports.filter((report) => report.id !== id);
    setReports(updatedReports);
    await saveReportsToStorage(updatedReports);
  };

  // Function to get reports for a specific date
  const getReportsForDate = (date: Date): Report[] => {
    const dateString = formatDate(date); // 'YYYY-MM-DD'
    return reports.filter((report) => report.date === dateString);
  };  

  // Function to get reports for a specific month
  const getReportsForMonth = (month: number, year: number): Report[] => {
    return reports.filter((report) => {
      const [reportYear, reportMonth] = report.date.split('-').map(Number);
      return reportYear === year && reportMonth === month + 1; // months are zero-indexed
    });
  };
  

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#337137" />
      </View>
    );
  }

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
          addReport={addReport}
          editReport={editReport}
          deleteReport={deleteReport}
          reports={reports}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});