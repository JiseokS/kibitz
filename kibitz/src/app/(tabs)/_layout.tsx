import { Tabs } from "expo-router";
import { Icon, colors } from "../../components/ui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: "#838A81",
        tabBarStyle: {
          backgroundColor: colors.paper,
          borderTopColor: colors.line,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarHideOnKeyboard: true,
        sceneStyle: { backgroundColor: colors.paper },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Reflect",
          tabBarIcon: ({ color }) => (
            <Icon
              name="sparkles-outline"
              color={typeof color === "string" ? color : colors.green}
              size={22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => (
            <Icon
              name="book-outline"
              color={typeof color === "string" ? color : colors.green}
              size={22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "My philosophy",
          tabBarIcon: ({ color }) => (
            <Icon
              name="compass-outline"
              color={typeof color === "string" ? color : colors.green}
              size={22}
            />
          ),
        }}
      />
    </Tabs>
  );
}
