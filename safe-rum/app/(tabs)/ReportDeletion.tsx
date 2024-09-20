import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReportDeletionScreenProps {
  goBack: () => void;
}

export default function ReportDeletionScreen({ goBack }: ReportDeletionScreenProps) {
  const [deletionReason, setDeletionReason] = useState('');

  const handleDelete = () => {
    if (!deletionReason) {
      Alert.alert('Please select a reason for deletion.');
      return;
    }

    Alert.alert(
      "Delete Report",
      `Do you really want to delete the report?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", style: "destructive", onPress: () => console.log("Report Deleted") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.icon}>
        <Ionicons name="arrow-back-circle" size={32} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Delete Report</Text>

      <View style={styles.wrapper}>
        <Text style={styles.label}>Title</Text>
        <View style={styles.field}>
          <Text style={styles.infoText}>Flooded Parking Lot</Text>
        </View>

        <Text style={styles.label}>Location</Text>
        <View style={styles.field}>
          <Text style={styles.infoText}>Stefani</Text>
        </View>

        <Text style={styles.label}>Date</Text>
        <View style={styles.field}>
          <Text style={styles.infoText}>9/20/2024</Text>
        </View>
      </View>

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
    backgroundColor: '#246C18',
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
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    gap: 16,
    width: 240,
    height: 'auto',
    marginBottom: 20,
  },
  field: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#8E8E93',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#B3261E',
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
