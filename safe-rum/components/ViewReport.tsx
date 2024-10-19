import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet, View, Modal, Text } from "react-native";
import { Report } from "@/app/(tabs)/ReportViewing";

export default function ViewReport({
  modalVisible,
  closeModal,
  selectedReport,
}: {
  modalVisible: boolean;
  closeModal: () => void;
  selectedReport: Report;
}) {
  return (
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
              <Text>Title</Text>
              <View style={styles.field}>
                <Text style={styles.infoText}>{selectedReport.title}</Text>
              </View>

              <Text>Label</Text>
              <View style={styles.field}>
                <Text style={styles.infoText}>{selectedReport.label}</Text>
              </View>

              <Text>Location</Text>
              <View style={styles.field}>
                <Text style={styles.infoText}>{selectedReport.location}</Text>
              </View>

              <Text>Time and Date</Text>
              <View style={styles.field}>
                <Text style={styles.infoText}>{selectedReport.timeAndDate}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#0F8F46",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFF",
    textAlign: "center",
  },
  modalScroll: {
    maxHeight: "100%",
  },
  wrapper: {
    marginBottom: 20,
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
  editButton: {
    backgroundColor: "#65558F",
    // width: "50%",
    alignSelf: "center",
    borderRadius: 100,
  },
  editText: {
    color: "#FFFFFF",
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
});
