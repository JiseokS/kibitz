import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { JournalProvider } from "../state/JournalProvider";
import { colors } from "../components/ui";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <JournalProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.paper },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="entry/[id]" />
          <Stack.Screen name="settings" options={{ presentation: "modal" }} />
        </Stack>
      </JournalProvider>
    </SafeAreaProvider>
  );
}
