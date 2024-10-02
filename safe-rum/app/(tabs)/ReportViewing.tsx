import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dummyReports = [
  { title: "Flooded Parking Lot", location: "Stefani", label: "The parking lot is completely flooded", timeAndDate: "2:30PM on 09/17/2024" },
  { title: "Suspicious Person", location: "Chardon", label: "Spotted a person acting strangely and erratically on the second floor of the Chardon building", timeAndDate: "8:46PM on 09/18/2024" },
  { title: "Car Accident", location: "Avenida Palmeras", label: "Minor car accident at Area Blanca entrance near Enfermeria", timeAndDate: "9:15AM on 09/19/2024" },
];

export default function CurrentReportsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const openModal = (report) => {
    setSelectedReport(report);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReport(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Current Reports</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {dummyReports.map((report, index) => (
          <View key={index} style={styles.reportCard}>
            <Text style={styles.label}>Title</Text>
            <View style={styles.field}>
              <Text style={styles.infoText}>{report.title}</Text>
            </View>

            <Text style={styles.label}>Location</Text>
            <View style={styles.field}>
              <Text style={styles.infoText}>{report.location}</Text>
            </View>

            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => openModal(report)}
            >
              <Text style={styles.expandButtonText}>Expand</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {selectedReport && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close-circle" size={32} color="#FFF" />
              </TouchableOpacity>

              <Text style={styles.modalHeaderText}>View Report</Text>

              <ScrollView style={styles.modalScroll}>
                <View style={styles.wrapper}>
                  <Text style={styles.label_expanded}>Title</Text>
                  <View style={styles.field}>
                    <Text style={styles.infoText}>{selectedReport.title}</Text>
                  </View>

                  <Text style={styles.label_expanded}>Label</Text>
                  <View style={styles.field}>
                    <Text style={styles.infoText}>{selectedReport.label}</Text>
                  </View>

                  <Text style={styles.label_expanded}>Location</Text>
                  <View style={styles.field}>
                    <Text style={styles.infoText}>{selectedReport.location}</Text>
                  </View>

                  <Text style={styles.label_expanded}>Time and Date</Text>
                  <View style={styles.field}>
                    <Text style={styles.infoText}>{selectedReport.timeAndDate}</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
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
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFF',
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: 300,
  },
  label: {
    fontSize: 14,
    color: '#246C18',
    marginBottom: 4,
  },
  label_expanded: {
    fontSize: 14,
    color: 'black',
    marginBottom: 4,
  },
  field: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
  },
  expandButton: {
    backgroundColor: '#6A4E99',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  expandButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#246C18',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%', // Adjust modal height
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFF',
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: '100%',
  },
  wrapper: {
    marginBottom: 20,
  },
});
