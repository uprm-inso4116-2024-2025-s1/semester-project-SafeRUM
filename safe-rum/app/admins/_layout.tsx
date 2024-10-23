import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="ReportMap" 
            options={{
                headerShown: false,
              }}
            />

            <Tabs.Screen name="ReportViewing" 
            options={{
                headerShown: false,
              }}
            />

            <Tabs.Screen name="Profile" 
            options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person" color={color} size={size} /> 
                ),
              }}
            />

        </Tabs>
    )
}