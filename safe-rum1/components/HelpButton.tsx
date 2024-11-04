// import React, { useState } from 'react';
import * as React from 'react';
import { useState } from 'react';

import { TouchableOpacity, Text, Modal, View, StyleSheet, Image} from 'react-native';

const HelpButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const modalContent = (
    <>
      <Text style={styles.modalHeader}>Color Guide</Text>
      <Image 
        source={require('../assets/images/DangerPointer.png')} 
        style={styles.DangerImage} 
      />
      <Text style={styles.modalText}>"Emergency area: High Priority alerts, avoid route due to potential events"</Text>
      <Image 
        source={require('../assets/images/CautionPointer.png')} 
        style={styles.CautionImage} 
      />
      <Text style={styles.modalText}>"Incoming Zone: Medium alerts. Proceed with caution as there may be potential issues"</Text>

      <Image 
        source={require('../assets/images/SafePointer.png')} 
        style={styles.SafeImage} 
      />
      <Text style={styles.modalText}>"Secured Zone: Low alerts. No immediate issues expected"</Text>
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
  CautionImage: {
    width: 65,
    height: 65,
    alignSelf: 'center',
    marginBottom: 15,
  },
  SafeImage: {
    width: 65,
    height: 65,
    alignSelf: 'center',
    marginBottom: 15,
  },
  DangerImage: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 15,
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