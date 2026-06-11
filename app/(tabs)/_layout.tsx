import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />

      <Tabs.Screen
        name="morning-connect"
        options={{
          title: "Morning",
        }}
      />

      <Tabs.Screen
        name="master-connect"
        options={{
          title: "Connect",
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}