import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const UserDetails: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default to 'student'
  const [open, setOpen] = useState(false); // For Dropdown state

  const handleSignOut = () => {
    alert('Signed out');
  };

  const handleSave = () => {
    alert('Signed out');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 2 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}  // Adjust based on the height of your header 
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.header}>My Profile</Text>

            {/* First Name Field */}
            <Text>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />

            {/* Last Name Field */}
            <Text>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
            />

            {/* Phone Number Field */}
            <Text>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="+1 123456789"
              keyboardType="phone-pad"
              returnKeyType="done"
            />

            {/* Email Field */}
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="fulano.details@upr.edu"
              keyboardType="email-address"
            />

            {/* Password Field */}
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="************"
              secureTextEntry
            />


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <DropDownPicker
                    open={open}
                    value={role}
                    items={[
                    { label: 'Student', value: 'student' },
                    { label: 'Professor', value: 'professor' },
                    { label: 'Faculty', value: 'faculty' },
                    { label: 'Staff', value: 'staff' },
                    ]}
                    setOpen={setOpen}
                    setValue={setRole}
                    placeholder="Select your role"
                    style={{ width: '100%', marginBottom: 20 , marginTop: 10}}
                />
            </View>

            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , flexDirection: 'row' }}>
              {/* Sign Out Button */}
              <Button title="Sign Out" onPress={handleSignOut} color="#ff8800" />
              {/* Save Button */}
              <Button title="Save" onPress={handleSave} color="green"  />
            </View>
            
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,   // Ensures the content can grow to fit within the scroll view
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
    backgroundColor: '#333',
  },
 

});