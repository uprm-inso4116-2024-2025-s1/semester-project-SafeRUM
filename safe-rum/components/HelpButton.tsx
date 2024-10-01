// import React, { useState } from 'react';
import * as React from 'react';
import { useState } from 'react';

import { TouchableOpacity, Text, Modal, View, StyleSheet } from 'react-native';

const HelpButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const modalContent = (
    <>
      <Text style={styles.modalHeader}>Color Guide</Text>
      <Text style={styles.modalText}>1st Image</Text>
      <Text style={styles.modalText}>Description of the 1st Color</Text>
      <Text style={styles.modalText}>2nd Image</Text>
      <Text style={styles.modalText}>Description of the 2nd Color</Text>
      <Text style={styles.modalText}>3rd Image</Text>
      <Text style={styles.modalText}>Description of the 3rd Color</Text>
    </>
  );

  return (
    <>
      <TouchableOpacity style={styles.helpButton} onPress={toggleModal}>
        <Text style={styles.helpButtonText}>?</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            {modalContent}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 350,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
  },
  modalHeader: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  modalText: {
    marginTop: 15,
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  helpButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 30, 
    height: 30, 
    backgroundColor: 'gray',
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    color: 'white',
    fontSize: 15, 
    fontWeight: 'bold',
  },
});

export default HelpButton;