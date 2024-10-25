import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

// Define the types for the props
interface HeaderProps {
  onCreateReport: () => void;
  onViewReports: () => void;
}
// Header Component with props type
const Header: React.FC<HeaderProps> = ({ onCreateReport, onViewReports }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Reports</Text>
    <View style={styles.headerButtons}>
      <TouchableOpacity style={styles.headerButton} onPress={onCreateReport}>
        <Text style={styles.headerButtonText}>Create Report</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.headerButton, styles.myReportsButton]}
        onPress={onViewReports}
      >
        <Text style={styles.headerButtonText}>My Reports</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Placeholder Component
const Placeholder = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>reports go here WIP</Text>
  </View>
);

// Main Report Screen Component
const ReportScreen = () => {
  const handleCreateReport = () => Alert.alert('Create Report Button Pressed');
  const handleViewReports = () => Alert.alert('My Reports Button Pressed');

  return (
    <SafeAreaView style={styles.container}>
      <Header onCreateReport={handleCreateReport} onViewReports={handleViewReports} />
      <View style={styles.content}>
        <Placeholder />
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#0F8F46',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  myReportsButton: {
    marginLeft: 10,
  },
  headerButtonText: {
    color: '#0F8F46',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set the background to white
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#7E7E7E',
  },
});
