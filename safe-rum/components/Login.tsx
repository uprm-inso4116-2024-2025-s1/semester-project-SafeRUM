import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from '@firebase/app';
import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
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

interface LoginScreenProps {
  toggleUserAuthScreen: () => void;
}

export default function Login({ toggleUserAuthScreen }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const router = useRouter();

  const API_URL = 'http://<your-ip>:3000';

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Login Successful', 'Redirecting...');
        router.push('/home');
      } else {
        Alert.alert('Login Failed', `${data.error || 'Invalid credentials'}`, [
          {
            text: 'Forgot Password?',
            onPress: () => setForgotPasswordModalVisible(true),
          },
          {
            text: 'OK',
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Something went wrong', [
        {
          text: 'Forgot Password?',
          onPress: () => setForgotPasswordModalVisible(true),
        },
        {
          text: 'OK',
        },
      ]);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Alert.alert('Error', 'Please enter your email to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert('Success', 'Password reset email sent successfully.');
      setForgotPasswordModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong with the reset process.');
    }
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
          placeholder="Password"
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
