import { Tabs } from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';

export default () => {
    return(
        <Tabs>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="ReportMap" />

            <Tabs.Screen
                name="userAuthScreen"
                options={{
                    title: 'Authentication',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'log-in' : 'log-in-outline'} color={color} />
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