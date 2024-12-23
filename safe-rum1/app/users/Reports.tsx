import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

// Define RootStackParamList for navigation types
type RootStackParamList = {
  ReportScreen: undefined;
  ReportCreation: undefined;
  MyReports: undefined; 
};

type ReportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReportScreen'>;

const ReportScreen = () => {
  const navigation = useNavigation<ReportScreenNavigationProp>();

  const handleCreateReportPress = () => {
    navigation.navigate('ReportCreation');
  };

  const handleMyReportsPress = () => {
    navigation.navigate('MyReports');
  };
  
  // Dummy data for reports
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Suspicious Activity',
      location: 'Library',
      description: 'Observed suspicious behavior near the library',
      status: 'Pending',
      category: 'General',
      priority: true,
      helpfulScore: 1,
      voted: false,
    },
    {
      id: 2,
      title: 'Broken Streetlight',
      location: 'Main Entrance',
      description: 'The streetlight near the main entrance is not working',
      status: 'Reviewed',
      category: 'Maintenance',
      priority: false,
      helpfulScore: 22,
      voted: false,
    },
    {
      id: 3,
      title: 'Vandalism',
      location: 'Cafeteria',
      description: 'Graffiti found on the side wall of the cafeteria',
      status: 'Pending',
      category: 'Security',
      priority: true,
      helpfulScore: 4,
      voted: false,
    },
    {
      id: 4,
      title: 'Water Leak',
      location: 'Parking Lot',
      description: 'Water leaking from the pipe near the parking lot',
      status: 'Resolved',
      category: 'Maintenance',
      priority: false,
      helpfulScore: 2,
      voted: false,
    },
  ]);

  const handleExpandPress = (report: { id: number; title: string; location: string; description: string; status: string; category: string; priority: boolean; helpfulScore: number; }) => {
    Alert.alert(
      report.title,
      `Location: ${report.location}
Description: ${report.description}
Category: ${report.category}
Status: ${report.status}
Helpful Commends: ${report.helpfulScore}`,
      [
        {
          text: 'Close',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const handleHelpfulPress = (id: number) => {
    setReports(prevReports =>
      prevReports.map(report => {
        if (report.id === id) {
          if (report.voted) {
            return { ...report, helpfulScore: report.helpfulScore - 1, voted: false };
          } else {
            return { ...report, helpfulScore: report.helpfulScore + 1, voted: true };
          }
        }
        return report;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with "Create Report" and "My Reports" buttons */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleCreateReportPress}
          >
            <Text style={styles.headerButtonText}>Create Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerButton, { marginLeft: 10 }]}
            onPress={handleMyReportsPress}
          >
            <Text style={styles.headerButtonText}>My Reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Green square cards with Title, Location, Expand button, and Helpful button */}
        {reports.map((report) => (
          <View key={report.id} style={styles.card}>
            <Text style={styles.cardText}>Title: {report.title}</Text>
            <Text style={styles.cardText}>Location: {report.location}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.expandButton}
                onPress={() => handleExpandPress(report)}
              >
                <Text style={styles.expandButtonText}>Expand</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.helpfulButton}
                onPress={() => handleHelpfulPress(report.id)}
              >
                <Text style={styles.helpfulButtonText}>{report.voted ? 'Unmark Helpful' : 'Mark Helpful'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
    backgroundColor: '#337137',
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
  headerButtonText: {
    color: '#337137',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#337137',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expandButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  expandButtonText: {
    color: '#337137',
    fontSize: 16,
  },
  helpfulButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  helpfulButtonText: {
    color: '#337137',
    fontSize: 16,
  },
});
