import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import ViewReport from "@/components/ViewReport";

export interface Report {
  title: string;
  location: string;
  label: string;
  timeAndDate: string;
  priority: boolean;
}

const dummyReports: Report[] = [
  {
    title: "Flooded Parking Lot",
    location: "Stefani",
    label: "The parking lot is completely flooded",
    timeAndDate: "2:30PM on 09/17/2024",
    priority: true,
  },
  {
    title: "Suspicious Person",
    location: "Chardon",
    label:
      "Spotted a person acting strangely and erratically on the second floor of the Chardon building",
    timeAndDate: "8:46PM on 09/18/2024",
    priority: false,
  },
  {
    title: "Car Accident",
    location: "Avenida Palmeras",
    label: "Minor car accident at Area Blanca entrance near Enfermeria",
    timeAndDate: "9:15AM on 09/19/2024",
    priority: true,
  },
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function CurrentReportsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Notifications need to be enabled to send alerts.");
    }
  };

  const openModal = (report: Report) => {
    setSelectedReport(report);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedReport(null);
  };

  const sendNotification = async (report: Report) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Priority Report Alert 🚨",
          body: `A priority report has been posted: ${report.title}. Tap to view details.`,
          data: { report },
        },
        trigger: null,
      });
      Alert.alert(
        "Notification Sent",
        `A notification for "${report.title}" has been sent successfully.`,
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send the notification.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Current Reports</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {dummyReports.map((report, index) => (
          <View key={index} style={[styles.reportCard, report.priority && styles.priorityCard]}>
            {report.priority && (
              <Ionicons name="alert-circle" size={24} color="red" style={styles.priorityIcon} />
            )}

            <Text style={styles.label}>Title</Text>
            <View style={styles.field}>
              <Text style={styles.infoText}>{report.title}</Text>
            </View>

            <Text style={styles.label}>Location</Text>
            <View style={styles.field}>
              <Text style={styles.infoText}>{report.location}</Text>
            </View>

            {report.priority && (
              <TouchableOpacity
                style={styles.notifyButton}
                onPress={() => sendNotification(report)}
              >
                <Text style={styles.notifyButtonText}>Send Notification</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.expandButton} onPress={() => openModal(report)}>
              <Text style={styles.expandButtonText}>Expand</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {selectedReport && (
        <ViewReport
          modalVisible={modalVisible}
          closeModal={closeModal}
          selectedReport={selectedReport}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#337137",
    paddingTop: 30,
  },
  scrollViewContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFF",
  },
  reportCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: 300,
    position: "relative",
  },
  priorityCard: {
    borderWidth: 2,
    borderColor: "red",
  },
  label: {
    fontSize: 14,
    color: "#337137",
    marginBottom: 4,
  },
  field: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#000",
  },
  notifyButton: {
    backgroundColor: "#B46A00",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  notifyButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  expandButton: {
    backgroundColor: "#4B3F92",
    padding: 8,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  expandButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  priorityIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
});
