import { Tabs } from "expo-router"
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

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
        </Tabs>
    )
}