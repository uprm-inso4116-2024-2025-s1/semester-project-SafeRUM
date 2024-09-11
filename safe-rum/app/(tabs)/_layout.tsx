import { Tabs } from "expo-router"

export default () => {
    return(
        <Tabs>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="ReportMap" />
            <Tabs.Screen name="Profile"/>
        </Tabs>
    )
}