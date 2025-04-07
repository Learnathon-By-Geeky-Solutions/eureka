import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        initialRouteName="home"
    >
      <Stack.Screen name="home" options={{title: "auth home", headerShown:false}} />
      <Stack.Screen name="login" options={{title: "log in", headerShown:false}} />
      <Stack.Screen name="register" options={{title: "Register" , headerShown:false}} />
    </Stack>
    </SafeAreaProvider>
    
  );
}
