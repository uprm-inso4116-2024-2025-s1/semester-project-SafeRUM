import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ProfileDetailsProps {
  firstName: string;
  lastName: string;
  role: string;
}

export default function ProfileDetails({ firstName, lastName, role }: ProfileDetailsProps) {
  return (
    <View style={styles.profileSection}>
      <Image source={require('../assets/images/no-profile.png')} style={styles.profileImage} />
      <View>
        <Text style={styles.profileName}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.profileRole}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '500',
  },
  profileRole: {
    fontSize: 16,
    color: '#000',
    opacity: 0.5,
  },
});
