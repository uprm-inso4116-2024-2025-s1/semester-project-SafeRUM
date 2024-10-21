import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../components/UserLogin'; 

interface ReportDeletionScreenProps {
  goBack: () => void;
}

interface Report {
  id: string;
  title: string;
  date: string;
}

export default function ReportDeletionScreen({ goBack }: ReportDeletionScreenProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [deletionReason, setDeletionReason] = useState('');

  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reports'));
      const reportsData: Report[] = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        title: doc.data().reportText,
        date: doc.data().timestamp, 
      }));
      setReports(reportsData);
    } catch (error) {
      console.error('Error fetching reports: ', error);
      Alert.alert('Error', 'Failed to fetch reports');
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = () => {
    if (selectedReport === null) {
      Alert.alert('Please select a report to delete.');
      return;
    }

    if (!deletionReason) {
      Alert.alert('Please select a reason for deletion.');
      return;
    }

    Alert.alert(
      "Delete Report",
      `Do you really want to delete the selected report?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => {
            setReports(prevReports => prevReports.filter(report => report.id !== selectedReport));
            setSelectedReport(null); 
            setDeletionReason('');  
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.icon}>
        <Ionicons name="arrow-back-circle" size={32} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Delete Report</Text>

      <ScrollView style={styles.scrollContainer}>
        {reports.length === 0 ? (
          <Text style={styles.noReportsText}>No reports available.</Text>
        ) : (
          reports.map(report => (
            <TouchableOpacity
              key={report.id}
              style={[
                styles.reportItem,
                selectedReport === report.id && styles.selectedReportItem
              ]}
              onPress={() => setSelectedReport(report.id)}
            >
              <Text style={styles.reportText}>
                {report.title} - {report.date}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {reports.length > 0 && (
        <>
          <Text style={styles.questionText}>Do you really want to delete this report?</Text>

          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setDeletionReason('solved')}
          >
            <View style={[styles.radioButton, deletionReason === 'solved' && styles.radioButtonSelected]}>
              {deletionReason === 'solved' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>Yes, the problem is solved</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setDeletionReason('false alarm')}
          >
            <View style={[styles.radioButton, deletionReason === 'false alarm' && styles.radioButtonSelected]}>
              {deletionReason === 'false alarm' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>Yes, it was a false alarm</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={goBack}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0F8F46',
    paddingTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFF',
  },
  icon: {
    position: 'absolute',
    top: 19,
    left: 15,
    display: 'none'
  },
  scrollContainer: {
    width: '90%',
    height: 200,
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8
  },
  noReportsText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  reportItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center',
  },
  selectedReportItem: {
    backgroundColor: '#BDECB6',
  },
  reportText: {
    fontSize: 16,
    color: '#000',
  },
  questionText: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 20,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#246C18',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  radioText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'left',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
    marginBottom: 20
  },
  cancelButton: {
    flex: 1,
    marginRight: 20,
    backgroundColor: '#8E8E93',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
