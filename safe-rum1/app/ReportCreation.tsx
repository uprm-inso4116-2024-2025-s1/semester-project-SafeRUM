import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import ReportGuidelines from "./ReportGuidelines";
import * as Location from "expo-location";

interface Location {
  latitude: number;
  longitude: number;
}

interface ReportAction {
  title: string;
  description: string;
  handleSubmit: (data: {
    location: Location | null;
    title: string;
    description: string;
    timestamp: string;
  }) => void;
}

interface SOSAction {
  title: string;
  type: string;
  handleSOS: (data: { location: Location | null; timestamp: string }) => void;
}

// Array for Regular Reports
const reportActions: ReportAction[] = [
  {
    title: "Safety Issue",
    description: "Report a safety concern",
    handleSubmit: (data) => {
      console.log("Safety Issue Reported:", data);
    },
  },
  {
    title: "Threat / Assault",
    description: "Report a threat or assault",
    handleSubmit: (data) => {
      console.log("Threat / Assault Reported:", data);
    },
  },
  {
    title: "Harassment",
    description: "Report harassment",
    handleSubmit: (data) => {
      console.log("Harassment Reported:", data);
    },
  },
  {
    title: "Sexual Harasser",
    description: "Report sexual harassment",
    handleSubmit: (data) => {
      console.log("Sexual Harassment Reported:", data);
    },
  },
];

// Array for SOS Reports
const sosActions: SOSAction[] = [
  {
    title: "Panic Alert",
    type: "Panic",
    handleSOS: (data) => {
      console.log("Panic Alert Sent:", data);
      Alert.alert("SOS Sent", "Panic alert has been sent successfully");
    },
  },
  {
    title: "Immediate Help",
    type: "Help",
    handleSOS: (data) => {
      console.log("Immediate Help Sent:", data);
      Alert.alert("SOS Sent", "Immediate help request has been sent successfully");
    },
  },
];

const createTimestamp = (): string => new Date().toLocaleString();

const validateReport = (title: string, description: string, location: Location | null): string | null => {
  if (!title.trim() || !description.trim()) {
    return "Report title and description cannot be empty.";
  }
  if (!location) {
    return "Please select a location on the map.";
  }
  return null;
};

const fetchCurrentLocation = async (): Promise<Location | null> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Location permission is required for SOS");
    return null;
  }
  try {
    const currentLocation = await Location.getCurrentPositionAsync({});
    return {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };
  } catch (error) {
    Alert.alert("Error", "Failed to fetch current location");
    return null;
  };
};

const ActionButton = ({
  title,
  onPress,
  style,
}: {
  title: string;
  onPress: () => void;
  style?: any;
}) => (
  <TouchableOpacity style={[styles.bubbleButton, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const MapWithMarker = ({
  location,
  onMapPress,
}: {
  location: Location | null;
  onMapPress: (event: MapPressEvent) => void;
}) => (
  <MapView
    style={styles.map}
    onPress={onMapPress}
    initialRegion={{
      latitude: 18.2106,
      longitude: -67.1396,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    }}
  >
    {location && <Marker coordinate={location} />}
  </MapView>
);

export default function Index({ goBack }: { goBack: () => void }) {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportAction | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [reportTitle, setReportTitle] = useState("");
  const [reportText, setReportText] = useState("");
  const [sosActive, setSosActive] = useState(false);
  const [viewGuidelines, setViewGuidelines] = useState(false);
  const [isHelpModalVisible, setHelpModalVisible] = useState(false);

  const openHelpModal = () => setHelpModalVisible(true);
  const closeHelpModal = () => setHelpModalVisible(false);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsWriting(true);
  };

  const HelpModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
    return (
      <Modal visible={isVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>How to Use the Report Creation Page</Text>
            <Text style={styles.modalText}>
              - Select a category for your report from the list.
              {"\n"}- Fill in the title and details of the report.
              {"\n"}- Use the map to select the location for your report.
              {"\n"}- Tap "Submit Report" to send it.
              {"\n\n"}For emergencies, use the "SOS" option to send an alert.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const handleSubmitReport = () => {
    if (reportText.trim() === "" || reportTitle.trim() === "") {
      Alert.alert("Error", "Report title and description cannot be empty");
    } else if (!location) {
      Alert.alert("Error", "Please select a location on the map");
    } else {
      // TODO: When the reports are fully implemented, the guidelines should **only** be shown to
      // the user for their first report.
      setViewGuidelines(true);
    }
  };

  const handleTermsAccepted = () => {
    const timestamp = new Date().toLocaleString();
    console.log(`Report Type: ${ReportType.Report}`);
    console.log("Category:", selectedCategory);
    console.log("Title:", reportTitle);
    console.log("Report:", reportText);
    console.log("Location:", location);
    console.log("Time:", timestamp);
    console.log("\n");
    Alert.alert("Success", "Report and location submitted");
    setReportTitle("");
    setReportText("");
    setLocation(null);
    setIsWriting(false);
  };

  const handleCancel = () => {
    setReportTitle("");
    setReportText("");
    setLocation(null);
    setIsWriting(false);
  };

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  const handleCancel = () => {
    setIsWriting(false);
    setSelectedReport(null);
    setReportTitle("");
    setReportText("");
    setLocation(null);
  };

  // const handleSOSAction = (sosAction: SOSAction) => {
  //   const timestamp = new Date().toLocaleString();
  //   sosAction.handleSOS({ location, timestamp });
  //   setSosActive(false);
  // };

  const handleSubmitReport = () => {
    const validationError = validateReport(reportTitle, reportText, location);
    if (validationError) {
      Alert.alert("Error", validationError);
      return;
    }
    setSosActive(false);
    setConfirmEnabled(false);
  };

  const handleCancelSOS = () => {
    setSosActive(false);
    setConfirmEnabled(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={goBack} style={styles.icon}>
        <Ionicons name="arrow-back-circle" size={32} color="#FFF" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#337137",
        }}
      >
        {!isWriting && !sosActive && (
          <>
            <Text style={styles.headerText}>Select a Category:</Text>
            <TouchableOpacity style={styles.helpButton} onPress={openHelpModal}>
              <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bubbleButton}
              onPress={() => handleSelectCategory("Safety Issue")}
            >
              <Text style={styles.buttonText}>Safety Issue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bubbleButton}
              onPress={() => handleSelectCategory("Threat / Assault")}
            >
              <Text style={styles.buttonText}>Threat / Assault</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bubbleButton}
              onPress={() => handleSelectCategory("Harassment")}
            >
              <Text style={styles.buttonText}>Harassment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bubbleButton}
              onPress={() => handleSelectCategory("Sexual Harasser")}
            >
              <Text style={styles.buttonText}>Sexual Harasser</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.redButton} onPress={handleSOSPress}>
              <Text style={styles.buttonText}>SOS</Text>
            </TouchableOpacity>
          </>
        )}

        {isWriting && (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={styles.headerText}>{selectedCategory}</Text>
            <TextInput
              placeholder="Title"
              value={reportTitle}
              onChangeText={setReportTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Label"
              value={reportText}
              onChangeText={setReportText}
              style={[styles.input, { height: 75 }]}
              multiline={true}
            />
            <MapView
              style={{ width: 300, height: 200, marginBottom: 10 }}
              initialRegion={{
                latitude: 18.2106,
                longitude: -67.1396,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}
              onPress={handleMapPress}
            >
              {location && <Marker coordinate={location} />}
            </MapView>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
              <Text style={styles.buttonText}>Submit Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.icon}>
              <Ionicons name="arrow-back-circle" size={32} color="#FFF" />
            </TouchableOpacity>

            <ReportGuidelines
              viewGuidelines={viewGuidelines}
              acceptTermsCallback={handleTermsAccepted}
            />
          </View>
        )}

        {sosActive && (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.headerText}>SOS</Text>
            <MapView
              style={{ width: 300, height: 200, marginBottom: 10 }}
              initialRegion={{
                latitude: 18.211005502415397,
                longitude: -67.14156653443999,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}
            >
              {location && <Marker coordinate={location} />}
            </MapView>
            <TouchableOpacity
              style={styles.redButton}
              onPress={() => handleConfirmSOS("Panic Alert")}
            >
              <Text style={styles.buttonText}>Panic Alert</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.redButton}
              onPress={() => handleConfirmSOS("Immediate Help")}
            >
              <Text style={styles.buttonText}>Immediate Help</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelSOS} style={styles.icon}>
              <Ionicons name="arrow-back-circle" size={32} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
        <HelpModal isVisible={isHelpModalVisible} onClose={closeHelpModal} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
  },
  bubbleButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "auto",
    alignItems: "center",
    backgroundColor: "#B46A00",
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "auto",
    alignItems: "center",
    backgroundColor: "#4B3F92",
  },
  redButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "auto",
    alignItems: "center",
    backgroundColor: "#B40000",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  icon: {
    position: "absolute",
    left: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#B40000",
    alignItems: "center",
    width: "50%",
  },
  helpButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#4B3F92",
  },
});
