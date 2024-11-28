import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

// Define RootStackParamList for navigation types
type RootStackParamList = {
    ReportScreen: undefined;
    ReportCreation: undefined;
    MyReports: undefined;
  };
  
  type MyReportsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyReports'>;
  
  const MyReportsScreen = () => {
    const navigation = useNavigation<MyReportsScreenNavigationProp>();
  
    const handleCreateReportPress = () => {
      navigation.navigate('ReportCreation');
    };
  
    const handleAllReportsPress = () => {
      navigation.navigate('ReportScreen');
    };

  const reports = [
    {
      id: 1,
      title: 'Suspicious Activity',
      location: 'Library',
      description: 'Observed suspicious behavior near the library',
      status: 'Pending',
      category: 'General',
      priority: true,
      helpfulScore: 1,
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
    },
  ];

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


  return (
    <SafeAreaView style={styles.container}>
      {/* Header with "Create Report" and "All Reports" buttons */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Reports</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleCreateReportPress}
          >
            <Text style={styles.headerButtonText}>Create Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerButton, { marginLeft: 10 }]}
            onPress={handleAllReportsPress}
          >
            <Text style={styles.headerButtonText}>All Reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Green square cards with Title, Location, and Expand button */}
        {reports.map((report) => (
          <View key={report.id} style={styles.card}>
            <Text style={styles.cardText}>Title: {report.title}</Text>
            <Text style={styles.cardText}>Location: {report.location}</Text>
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => handleExpandPress(report)}
            >
              <Text style={styles.expandButtonText}>Expand</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyReportsScreen;

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
});
