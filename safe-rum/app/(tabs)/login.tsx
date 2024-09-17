import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

// Import the SafeRum logo
const SafeRumLogo = require('../../assets/images/SafeRumLogo.png'); // Adjust path if needed

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        Alert.alert('Login Failed', data.error || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      {/* Full-size logo on top */}
      <Image source={SafeRumLogo} style={styles.logo} />

      {/* Foreground content */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome to SafeRUM</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
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

        <TouchableOpacity onPress={() => Alert.alert('Sign Up or Forgot Password')}>
          <Text style={styles.signupText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items from top to bottom
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 50, // Add padding to push content down
  },
  logo: {
    width: width * 0.7, // 70% of the screen width for a bigger logo
    height: height * 0.25, // 25% of the screen height for good visibility
    resizeMode: 'contain', // Makes sure the logo retains its aspect ratio and is not cropped
    marginBottom: 30, // Space between the logo and the title
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
    borderRadius: 10,
    padding: 20,
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
    backgroundColor: '#008000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#008000',
    fontSize: 16,
  },
});
