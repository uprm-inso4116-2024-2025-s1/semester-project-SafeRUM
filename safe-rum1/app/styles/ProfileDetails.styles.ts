import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
