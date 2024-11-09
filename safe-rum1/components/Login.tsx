import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from '@firebase/app';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'expo-router';

// Import the SafeRum logo
const SafeRumLogo = require('../assets/images/SafeRumLogo.png'); // Adjust path if needed

const firebaseConfig = {
  apiKey: "AIzaSyCIb-bHGc68LhhHOGmz5QjZBJ5T3DAoGO4",
  authDomain: "saferum-fcc4b.firebaseapp.com",
  projectId: "saferum-fcc4b",
  storageBucket: "saferum-fcc4b.appspot.com",
  messagingSenderId: "11200525932",
  appId: "1:11200525932:web:4e741499413e43017e4a49",
  measurementId: "G-6M83VVM4YY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Predefined list of admin emails with temporary passwords
const adminList: { [key: string]: string } = {
  'admin1@upr.edu': 'temp1234',
  'admin2@upr.edu': 'temp5678',
};

export default function Login({ toggleUserAuthScreen }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!username) {
      Alert.alert('Error', 'Please enter your username or email.');
      return;
    }

    // Check if user is an admin
    if (adminList[username]) {
      // Check if the user is using a temporary password
      if (adminList[username].startsWith('temp')) {
        // Admin has a temporary password, prompt to change it
        if (!password || adminList[username] === password) {
          setIsAdmin(true);
          setModalVisible(true); // Show the change password modal
        } else {
          // Admin password does not match the temporary password
          Alert.alert('Login Failed', 'Incorrect password. Please enter your temporary password.');
        }
      } else {
        // Admin has already changed their password, proceed with regular login
        console.log(password);
        if (!password) {
          Alert.alert('Error', 'Please enter your password.');
          return;
        }

        if (adminList[username] === password) {
          Alert.alert('Login Successful', 'Redirecting to Admin Home...');
          router.push('/admins/ReportMap');
        } else {
          Alert.alert('Login Failed', 'Incorrect password.');
        }
      }
    } else {
      // Regular user login using Firebase
      if (!password) {
        Alert.alert('Error', 'Please enter your password.');
        return;
      }

      signInWithEmailAndPassword(auth, username, password)
        .then(() => {
          Alert.alert('Login Successful', 'Redirecting...');
          router.push('/users/Reports');
        })
        .catch((error) => {
          Alert.alert('Login Failed', `${error.message || 'Invalid credentials'}`, [
            {
              text: 'Forgot Password?',
              onPress: () => setForgotPasswordModalVisible(true),
            },
            {
              text: 'OK',
            },
          ]);
        });
    }
  };

  const handleChangePassword = () => {
    if (!newPassword) {
      Alert.alert('Error', 'Please enter a new password.');
      return;
    }

    // Update the admin's password in the adminList and no longer treat it as a temporary password
    adminList[username] = newPassword;
    Alert.alert('Success', 'Your password has been changed successfully!');
    setModalVisible(false);
    setPassword(''); // Clear the password field
  };

  const handleForgotPassword = () => {
    if (!resetEmail) {
      Alert.alert('Error', 'Please enter your email to reset your password.');
      return;
    }

    // Send a password reset email using Firebase
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        Alert.alert('Success', 'Password reset email sent successfully.');
        setForgotPasswordModalVisible(false);
      })
      .catch((error) => {
        Alert.alert('Error', `Something went wrong with the reset process: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={SafeRumLogo} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome to SafeRUM!</Text>

        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#7E7E7E"
        />

        <TextInput
          style={styles.input}
          placeholder="Password (Optional for admins init.)"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          placeholderTextColor="#7E7E7E"
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.toggleTextContainer}>
          <Text style={styles.toggleText}>Don't have an account? </Text>
          <TouchableOpacity onPress={toggleUserAuthScreen}>
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setForgotPasswordModalVisible(true)}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Modal for changing admin password */}
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity style={styles.resetButton} onPress={handleChangePassword}>
                <Text style={styles.resetButtonText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Forgot Password Modal */}
        <Modal
          visible={forgotPasswordModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setForgotPasswordModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reset Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                value={resetEmail}
                onChangeText={setResetEmail}
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword}>
                <Text style={styles.resetButtonText}>Send Reset Email</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setForgotPasswordModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: width * 0.7,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7E7E7E',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: '#000000',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#009A44',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
  },
  linkText: {
    color: '#009A44',
    fontWeight: 'bold',
    paddingVertical: 2
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resetButton: {
    width: '100%',
    backgroundColor: '#009A44',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#009A44',
    fontWeight: 'bold',
  },
});
