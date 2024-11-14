import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Modal } from "react-native";

/**
 *  ReportGuidelines show the guidelines that a user must follow whenever creating a report.
 *
 * @component
 * @param {boolean} viewGuidelines - Boolean that determines whether to show the guidelines or not.
 * @param acceptTermsCallback - Callback function for when the user accepts the terms.
 */
const ReportGuidelines = ({
  viewGuidelines,
  acceptTermsCallback,
}: {
  viewGuidelines: boolean;
  acceptTermsCallback: () => void;
}) => {
  const guidelines = `Only submit reports for legitimate safety concerns.

Avoid false, prank, or targeted reports unrelated to safety, as misuse may lead to a ban. 

Reports may be removed if irrelevant, inappropriate, or already resolved.

Confirmation, review, and possible follow-up will occur. Authorities will address safety concerns.

Respect privacy, avoid assumptions, and report issues separately if needed.`;

  return (
    <Modal animationType="fade" transparent={true} visible={viewGuidelines}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>Guidelines for Reporting</Text>
          <Text style={styles.guidelines}>{guidelines}</Text>
          <TouchableOpacity style={styles.button} onPress={acceptTermsCallback}>
            <Text style={styles.buttonText}>I accept these terms</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReportGuidelines;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "60%",
    margin: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    color: "#B40000",
    fontSize: 21,
    fontWeight: "bold",
    marginVertical: 10,
  },
  guidelines: {
    fontSize: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#65558F",
    margin: 10,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
