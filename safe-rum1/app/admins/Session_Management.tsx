import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppState } from 'react-native';  // To monitor app state (background/foreground)
import { router } from 'expo-router';

const DummyLogout: React.FC = () => {
  const [token, setToken] = useState<string | null>('dummy_token');  // Simple token in state
  const navigation = useNavigation();
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);  // Ref to store inactivity timeout
  const INACTIVITY_TIME = 1 * 60 * 1000000;  // Set inactivity time limit (e.g., 5 minutes)

  // Start the inactivity timer
  useEffect(() => {
    startInactivityTimer();

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      subscription.remove();  // Clean up the AppState listener
    };
  }, []);

  // Handle app state changes (background/foreground)
  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'active') {
      resetInactivityTimer();  // Reset timer when user comes back to the app
    } else {
      clearTimeout(inactivityTimeoutRef.current!);  // Clear the timer when app is inactive
    }
  };

  // Start the inactivity timer
  const startInactivityTimer = () => {
    inactivityTimeoutRef.current = setTimeout(() => {
      handleLogout();  // Log out after the inactivity time
    }, INACTIVITY_TIME);
  };

  // Reset the inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    startInactivityTimer();  // Restart the timer
  };

  // Handle logout
  const handleLogout = () => {
    setToken(null);  // Clear the token from state
    Alert.alert('Logged out', 'You have been logged out, due to inactivity for security reasons. Please log in again to continue.');
    router.push('/Authentication');  // Redirect to the login screen or wherever necessary
  };

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      {token ? (
        <>
          <Text>You are logged in with token: {token}</Text>
          <TouchableOpacity onPress={resetInactivityTimer}>
            <Button title="Logout" onPress={handleLogout} />
          </TouchableOpacity>
        </>
      ) : (
        <Text>You are not logged in.</Text>
      )}
    </View>
  );
};

export default DummyLogout;
