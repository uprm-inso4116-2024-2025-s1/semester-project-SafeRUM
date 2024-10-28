import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="ReportMap" />

            <Tabs.Screen
                name="userAuthScreen"
                options={{
                    title: 'Authentication',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='log-in' color={color} size={size}/>
                    ),
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