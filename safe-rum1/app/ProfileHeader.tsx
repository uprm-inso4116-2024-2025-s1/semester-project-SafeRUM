import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface ProfileHeaderProps {
  onCancel: () => void;
}

export default function ProfileHeader({ onCancel }: ProfileHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onCancel}>
        <Image
          source={require('../assets/images/arrowLeft.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Edit Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  arrowIcon: {
    width: 36,
    height: 28,
  },
});
