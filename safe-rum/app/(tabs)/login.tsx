import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

// Import the SafeRum logo
const SafeRumLogo = require('../../assets/images/SafeRumLogo.png'); // Adjust path if needed

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  // This is if you're running it on the web and not on Expo Go
  // If you want to run it on the app you'll need to change it to the 
  const API_URL = 'http://192.168.0.9:3000/api'; 

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
  
      const responseText = await response.text();

      console.log('Raw response: ', responseText); // Print the raw response for debugging

      let data;
      try {
        data = JSON.parse(responseText); // Parse the response as JSON
      } catch (error) {
        console.error('Error pasring JSON: ', error);
        throw new Error('Invalid response from server');
      }
  
      if (response.ok) {
        Alert.alert('Login Successful', 'Redirecting...');
        router.push('/home');
      } else {
        const errorMessage = data.error || 'Invalid credentials';
        if (errorMessage.includes('locked')) {
          Alert.alert('Account Locked', 'Too many failed attempts. Please contact support or try later.');
        } else {
          Alert.alert('Login Failed', errorMessage, [
            {
              text: 'Forgot Password?',
              onPress: handleForgotPassword,
            },
            {
              text: 'OK',
            },
          ]);
        }
      }
    } catch (error) {
      const err = error as Error;
      Alert.alert('Login Failed', `Something went wrong: ${err.message}`, [
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },
  logo: {
    width: width * 0.7,
    height: height * 0.25,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    backgroundColor: '#0F8F46',
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
    color: '#0F8F46',
    fontSize: 16,
  },
});
