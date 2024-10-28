import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface AddReportModalProps {
  visible: boolean;
  onClose: () => void;
  onAddReport: (date: Date, title: string, description: string) => void;
}

const AddReportModal: React.FC<AddReportModalProps> = ({
  visible,
  onClose,
  onAddReport,
}) => {
  const [newReportTitle, setNewReportTitle] = useState('');
  const [newReportDescription, setNewReportDescription] = useState('');
  const [newReportDate, setNewReportDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleAddReport = () => {
    if (newReportTitle.trim() === '' || newReportDescription.trim() === '') {
      alert('Please enter a title and description.');
      return;
    }

    onAddReport(newReportDate, newReportTitle, newReportDescription);

    setNewReportTitle('');
    setNewReportDescription('');
    setNewReportDate(new Date());

    onClose();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setNewReportDate(date);
    hideDatePicker();
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
            <Text style={styles.modalTitle}>Add New Report</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newReportTitle}
            onChangeText={setNewReportTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newReportDescription}
            onChangeText={setNewReportDescription}
            multiline
          />
          {/* Date Picker Button */}
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.datePickerButton}
          >
            <Text style={styles.datePickerText}>
              {newReportDate.toDateString()}
            </Text>
          </TouchableOpacity>


          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddReport} style={styles.submitButton}>
              <Text style={styles.buttonText}>Add Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddReportModal;

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
    color: '#0F8F46',
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
  datePickerButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
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
    backgroundColor: '#0F8F46',
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
