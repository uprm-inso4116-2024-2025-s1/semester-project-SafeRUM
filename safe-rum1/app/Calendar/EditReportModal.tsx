import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Report {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface EditReportModalProps {
  visible: boolean;
  onClose: () => void;
  report: Report;
  onEditReport: (title: string, description: string) => void;
}

const EditReportModal: React.FC<EditReportModalProps> = ({
  visible,
  onClose,
  report,
  onEditReport,
}) => {
  const [title, setTitle] = useState(report.title);
  const [description, setDescription] = useState(report.description);

  useEffect(() => {
    if (report) {
      setTitle(report.title);
      setDescription(report.description);
    }
  }, [report]);

  const handleEditReport = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Validation Error', 'Please enter a title and description.');
      return;
    }

    onEditReport(title, description);

    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.addReportModalContainer}>
        <View style={styles.addReportModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Report</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#337137" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditReport} style={styles.submitButton}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditReportModal;

const styles = StyleSheet.create({
  addReportModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  addReportModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#337137',
  },
  closeButton: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: '#337137',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});