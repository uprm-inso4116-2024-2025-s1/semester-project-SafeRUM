import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Modal, ScrollView } from "react-native";

/**
 * AppGuidelines Component
 * Displays the guidelines for report creation in the app.
 *
 * @component
 * @param {boolean} visible - Controls the visibility of the guidelines modal.
 * @param onClose - Callback function to close the modal.
 */
const AppGuidelines = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>App Guidelines</Text>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.section}>
              <Text style={styles.subHeader}>Reasons for Submitting a Report</Text>
              <Text style={styles.bodyText}>
                Reports should only be submitted for legitimate safety concerns that may impact the campus community. This includes, but is not limited to:
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Suspicious behavior or activities
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Harassment or bullying
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Physical or verbal threats
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Theft or property damage
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Unsafe conditions (e.g., hazardous materials, dangerous locations)
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Any other activities that may endanger student safety or the well-being of the campus
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subHeader}>Grounds for Being Banned from Reporting</Text>
              <Text style={styles.bodyText}>
                Misuse of the reporting system can result in being banned from submitting future reports. The following actions will lead to a ban:
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Submitting false or misleading information
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Making prank reports or using the system for entertainment purposes
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Harassing or targeting specific individuals without cause
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Submitting reports unrelated to safety concerns (e.g., personal grievances)
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} Spamming the system with multiple unnecessary reports
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subHeader}>Examples of Proper Report Usage</Text>
              <Text style={styles.bodyText}>
                Proper Usage:
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} “I noticed someone acting suspiciously near the campus dorms late at night. They were lingering around the parking lot and peering into cars.”
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} “The lights on the way to ADEM are out, making the area unsafe for students walking at night.”
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} “I heard shouting and loud noises coming from a classroom on campus, and I’m worried someone might be in danger.”
              </Text>
              <Text style={styles.bodyText}>
                Improper Usage:
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} “My professor gave me a bad grade, and I think they are out to get me.”
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} “I don’t like the way my roommate looks at me, and I want them gone.”
              </Text>
              <Text style={styles.bullet}>
                {"\u2022"} “There’s no pizza in the cafeteria, this is unacceptable!”
              </Text>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AppGuidelines;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#337137",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  bodyText: {
    fontSize: 15,
    marginTop: 5,
  },
  bullet: {
    fontSize: 15,
    marginLeft: 15,
    marginTop: 3,
  },
  section: {
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#337137",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 15,
  },
  scrollView: {
    paddingBottom: 20,
  },
});
