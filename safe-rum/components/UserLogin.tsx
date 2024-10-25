import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from '@firebase/app';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // For navigation

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
const db = getFirestore(app);

const navigation = useNavigation(); // Use navigation for redirection



interface UserLoginScreenProps {
  toggleUserAuthScreen: () => void;
  setUserAuthenticated: (authenticated: boolean) => void;
  userAuthenticated: boolean;
}

export default function UserLogin({ toggleUserAuthScreen, userAuthenticated, setUserAuthenticated }: UserLoginScreenProps) {
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false); 
  const [resetEmail, setResetEmail] = useState(''); 

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
    // if (!email || !password) {
    //   Alert.alert('Empty Fields', 'Make sure to fill out all fields before submitting.');
    //   return;
    // }

    // if (!validateEmail(email)) {
    //   Alert.alert('Invalid Email', 'Please enter a valid UPR email ending with @upr.edu');
    //   return;
    // }

    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
        setUserAuthenticated(true); 
        Alert.alert('Success', 'You have logged in successfully!');
        clearLogInItems();

      //   const userRole = 'admin'; 

      //   if (userRole === 'admin') {
      //     navigation.navigate('AdminDashboard'); // Redirect to Admin dashboard (this need to change to the dashboard when that task is done)
      //   } else {
      //     navigation.navigate('home'); // Redirect regular users to Home
      //   }

      // })
      // .catch((error) => {
      //   Alert.alert('Authentication Error', error.message);
      // });
  };

  const handleForgotPassword = () => {
    if (!resetEmail) {
      Alert.alert('Empty Email', 'Please enter your email to reset your password.');
      return;
    }

    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        Alert.alert('Success', 'Password reset email sent successfully.');
        setForgotPasswordModalVisible(false); 
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
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

      {userAuthenticated && (
        <Text style={styles.successMessage}>User Authenticated</Text> 
      )}

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
    backgroundColor: '#009A44',
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
  successMessage: {
    color: 'green',
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
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
    color: '#009A44',
    fontWeight: 'bold',
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

export { db };