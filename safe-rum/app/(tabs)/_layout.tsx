import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="ReportMap" />

            <Tabs.Screen
                name="Authentication"
                options={{
                    title: 'Authentication',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='log-in' color={color} size={size}/>
                    ),
                }}
            />

        </Tabs>
    )
}