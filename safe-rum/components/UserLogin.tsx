import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserLoginScreenProps {
  toggleUserAuthScreen: () => void;
}

export default function UserLogin({ toggleUserAuthScreen }: UserLoginScreenProps) {
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email: string) => {
    return email.endsWith('@upr.edu');
  };

  const toggleCheckbox = () => {
    setRememberMe(!rememberMe);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const clearLogInItems = () => {
    setEmail('');
    setPassword('');
    setPasswordVisible(false);
    setRememberMe(false);
  }

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Empty Fields', 'Make sure to fill out all fields before submitting.')
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid UPR email ending with @upr.edu');
      return;
    }

    // Handle backend password logic here

    Alert.alert('Success', 'You have logged in successfully!');

    clearLogInItems();

  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleCheckbox}>
          <Ionicons 
            name={rememberMe ? 'checkbox' : 'square-outline'} 
            size={24} 
            color={rememberMe ? '#327136' : '#888'} 
          />
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Remember me</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.toggleTextContainer}>
        <Text style={styles.toggleText}>Don't have an account? </Text>
        <TouchableOpacity onPress={toggleUserAuthScreen}>
          <Text style={styles.linkText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '89%',
    alignItems: 'center',
    marginLeft: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingRight: 50,
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 22,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#888',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#327136',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
  },
  linkText: {
    color: '#327136',
    fontWeight: 'bold',
  },
});
