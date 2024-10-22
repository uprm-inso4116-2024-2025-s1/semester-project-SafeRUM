import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

// Import the SafeRum logo
const SafeRumLogo = require('../assets/images/SafeRumLogo.png'); // Adjust path if needed

interface LoginScreenProps {
  toggleUserAuthScreen: () => void;
}

export default function Login({ toggleUserAuthScreen } : LoginScreenProps) {
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
        Alert.alert('Login Failed', `${data.error || 'Invalid credentials'}`, [
          {
            text: 'Forgot Password?',
            onPress: handleForgotPassword,
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
          onPress: handleForgotPassword,
        },
        {
          text: 'OK',
        },
      ]);
    }
  };

  const handleForgotPassword = async () => {
    if (!username) {
      Alert.alert('Error', 'Please enter your username or email to reset your password.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      });

      if (response.ok) {
        Alert.alert('Password Reset', 'An email has been sent with a reset link.');
      } else {
        Alert.alert('Error', 'Unable to send the password reset email.');
      }
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
    // paddingTop: 50,
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
    // padding: 20,
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
    // marginTop: 25,
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
  },
  linkText: {
    color: '#009A44',
    fontWeight: 'bold',
  },
});