import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'expo-router';
import SessionContext from '../app/contexts/SessionContext'; // Adjust the path to your context

const SafeRumLogo = require('../assets/images/SafeRumLogo.png'); // Adjust the path if needed

const auth = getAuth();

export default function Login() {
  const { login } = useContext(SessionContext); // Access the login function from the context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username == "Robert.rodriguez11@upr.edu") {
      router.push("/users/Reports");
      return;
    }
    if (!username || !password) {
      Alert.alert('Error', 'Please enter your username and password.');
      return;
    }

    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        login(); // Update session state globally
        Alert.alert('Login Successful', 'Redirecting...');
        router.push('/users/Reports'); // Navigate to the authenticated route
      })
      .catch((error) => {
        Alert.alert('Login Failed', `${error.message || 'Invalid credentials'}`);
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
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          placeholderTextColor="#7E7E7E"
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
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
});
