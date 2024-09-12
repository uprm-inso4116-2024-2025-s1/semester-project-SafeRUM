
import { View, Text} from 'react-native';
import ProfilePicture from '@/components/ProfilePicture';
import UserDetails from '@/components/UserDetails';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProfilePicture/>
      <UserDetails/>

    </View>
  );
}
