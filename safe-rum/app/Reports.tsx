import React, { useState } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Alert,} from 'react-native';
import Index from './ReportCreation';
import ReportDeletionScreen from './ReportDeletion';


const ReportScreen = () => {
  const [createState, setCreateState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const goBackCreate = () => {
    setCreateState(!createState);
  };
  const goBackDelete = () => {
    setDeleteState(!deleteState);
  }

  if (createState) {
    return <Index goBack={goBackCreate}/>
  }
  if (deleteState) {
    return <ReportDeletionScreen goBack={goBackDelete}/>
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with "Create Report" and "My Reports" buttons */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setCreateState(true)}
          >
            <Text style={styles.headerButtonText}>Create Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerButton, { marginLeft: 10 }]}
            onPress={() => setDeleteState(true)}
          >
            <Text style={styles.headerButtonText}>Delete Reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* White background with text */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>reports go here WIP</Text>
        </View>
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
