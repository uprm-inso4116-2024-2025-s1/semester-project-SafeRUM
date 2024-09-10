import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import UserSignup from '@/components/UserSignup';
import UserLogin from '@/components/UserLogin';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function UserAuthScreen() {
  const [isLogin, setIsLogin] = useState(false);

  const formWidth = Platform.OS === 'web' ? Math.min(400, width * 0.4) : width * 0.85;
  const formHeight = Platform.OS === 'web' ? Math.min(500, height * 0.6) : height * 0.6;

  const translationX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationX.value }],
    };
  });

  const toggleUserAuthScreen = () => {
    translationX.value = withTiming(isLogin ? 0 : -formWidth, { duration: 500 });
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.formWrapper, { width: formWidth, height: formHeight }]}>
        <Animated.View style={[styles.animatedForm, animatedStyle, { width: formWidth * 2 }]}>
          <View style={[styles.formContent, { width: formWidth }]}>
            <UserSignup toggleUserAuthScreen={toggleUserAuthScreen} />
          </View>
          <View style={[styles.formContent, { width: formWidth }]}>
            <UserLogin toggleUserAuthScreen={toggleUserAuthScreen} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    minHeight: 350,
    maxHeight: '70%',
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    justifyContent: 'center',
  },
  animatedForm: {
    flexDirection: 'row',
    height: '100%',
  },
  formContent: {
    padding: 20,
    justifyContent: 'center',
  },
});
