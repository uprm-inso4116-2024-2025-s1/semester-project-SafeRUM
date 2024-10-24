
import { Alert } from 'react-native';

export const showPermissionDeniedAlert = () => {
    Alert.alert(
      "Permission Denied",
      "Permission to access location was denied. Please enable it in your device settings."
    );
  };


  export const showFailedGettingUserLocation = () => {
    Alert.alert(
      "Permission Denied",
      "Permission to access location was denied. Please enable it in your device settings."
    );
  };


