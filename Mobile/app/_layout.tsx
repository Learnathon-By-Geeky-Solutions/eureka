import AuthProvider, { useAuth } from "@/context/AuthContext";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    SplashScreen.hide();
    if (!authState?.authentication) {
      router.replace("/(auth)/home");
      // router.navigate('/(auth)/home')
    } else {
      router.replace("/(tabs)");
    }
  }, [authState?.authentication]);

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
    // <SafeAreaView style={{flex: 1}}>

    // </SafeAreaView>
  );
};
