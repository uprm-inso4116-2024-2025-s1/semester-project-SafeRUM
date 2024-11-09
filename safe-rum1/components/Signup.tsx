import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { router } from 'expo-router';

// Firebase Configuration
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

interface SignUpScreenProps {
  toggleUserAuthScreen: () => void;
}

export default function UserSignUp({ toggleUserAuthScreen }: SignUpScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const clearSignUpItems = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPasswordVisible(false);
  };

const isValidEmail = () => {
    let regex = /[-a-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[a-z0-9](?:[-a-z0-9]*[a-z0-9])?\.)+[a-z0-9](?:[-a-z0-9]*[a-z0-9])?/i;
    return regex.test(email);
}
const isUprEmail = () => {
    let result = email.substring(email.length - 7);
    return result == "upr.edu";
}

  const handleRegister = () => {
    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (!isValidEmail()){
      Alert.alert('Error', 'Please enter a valid email.');
      return;
    }
    if (!isUprEmail()){
      Alert.alert('Error', 'Please enter a Upr email address.');
      return;
    }
  

    


    // Registering user with Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registered successfully
        Alert.alert('Success', 'Account created successfully!');
        clearSignUpItems();
        // toggleUserAuthScreen(); // Redirect to login after successful signup
        router.push('/users/Reports');
      })
      .catch((error) => {
        // Handle registration errors
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={text => setFirstName(text.charAt(0).toUpperCase() + text.slice(1))}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={text => setLastName(text.charAt(0).toUpperCase() + text.slice(1))}
      />

      <TextInput
        style={styles.input}
        placeholder="UPR Email"
        keyboardType="email-address"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={confirmPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.toggleTextContainer}>
        <Text style={styles.toggleText}>Already have an account? </Text>
        <TouchableOpacity onPress={toggleUserAuthScreen}>
          <Text style={styles.linkText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    height: 30,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingRight: 45,
    marginVertical: 8,
    paddingVertical: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 18,
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#009A44',
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  toggleText: {
    color: '#333',
    fontSize: 14,
  },
  linkText: {
    color: '#009A44',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
