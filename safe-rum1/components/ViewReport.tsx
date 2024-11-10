import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
} from "react-native";
import { Report } from "@/app/admins/ReportViewing";

export default function ViewReport({
  modalVisible,
  closeModal,
  selectedReport,
}: {
  modalVisible: boolean;
  closeModal: () => void;
  selectedReport: Report;
}) {
  // Edit mode allows editing the report
  const [inEditMode, setEditMode] = useState(false);

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

          <Text style={styles.modalHeaderText}>{inEditMode ? "Edit Report" : "View Report"}</Text>

          <ScrollView style={styles.modalScroll}>
            <View style={styles.wrapper}>
              <Text>Title</Text>
              <View style={styles.field}>
                <TextInput style={styles.infoText} editable={inEditMode}>
                  {selectedReport.title}
                </TextInput>
              </View>

              <Text>Label</Text>
              <View style={styles.field}>
                <TextInput
                  style={styles.infoText}
                  editable={inEditMode}
                  multiline={true}
                  numberOfLines={4}
                >
                  {selectedReport.label}
                </TextInput>
              </View>

              <Text>Location</Text>
              <View style={styles.field}>
                <TextInput style={styles.infoText} editable={inEditMode}>
                  {selectedReport.location}
                </TextInput>
              </View>

              <Text>Time and Date</Text>
              <View style={styles.field}>
                <TextInput style={styles.infoText} editable={inEditMode}>
                  {selectedReport.timeAndDate}
                </TextInput>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(!inEditMode)}>
              <Text style={styles.editText}>{inEditMode ? "Apply" : "Edit"}</Text>
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
