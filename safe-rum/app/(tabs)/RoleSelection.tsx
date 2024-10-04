import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React = require("react");

const { width, height } = Dimensions.get("window");
const SafeRumLogo = require('../../assets/images/SafeRumLogo.png');

const RoleSelection = () => {
  const [scaleValueUser] = useState(new Animated.Value(1));
  const [scaleValueAdmin] = useState(new Animated.Value(1));
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState < string | null > (null); // role initially undefined, until role is selected

  const onRoleSelect = async (role: string) => {
    setSelectedRole(role);  // Set the selected role
    await AsyncStorage.setItem("selectedRole", role);
    router.push("/userAuthScreen");
  };

  const onPressIn = (scaleValue: Animated.Value) => {
    Animated.timing(scaleValue, {
      toValue: 0.85,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = (scaleValue: Animated.Value, role: string) => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    // Trigger role selection
    onRoleSelect(role);
  };

  return (
    <View style={styles.container}>
      <Image source={SafeRumLogo} style={styles.logo} />
      <Text style={styles.title}>Who are you?</Text>
      <View style={styles.buttonsContainer}>
        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleValueUser }] }]}>
          <TouchableOpacity
            style={[styles.button, styles.userButton]}
            onPressIn={() => onPressIn(scaleValueUser)}
            onPressOut={() => onPressOut(scaleValueUser, "user")}
          >
            <Ionicons name="person-circle" size={30} color="#fff" />
            <Text style={styles.buttonText}>User</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleValueAdmin }] }]}>
          <TouchableOpacity
            style={[styles.button, styles.adminButton]}
            onPressIn={() => onPressIn(scaleValueAdmin)}
            onPressOut={() => onPressOut(scaleValueAdmin, "admin")}
          >
            <Ionicons name="briefcase" size={30} color="#fff" />
            <Text style={styles.buttonText}>Admin</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: width * 0.5,
    height: height * 0.25,
    resizeMode: 'cover',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.8,
  },
  buttonWrapper: {
    width: width * 0.35,
  },
  button: {
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    backgroundColor: "#009c4f",
  },
  userButton: {
    backgroundColor: "#009c4f",
  },
  adminButton: {
    backgroundColor: "#009c4f",
  },
  buttonText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default RoleSelection;

