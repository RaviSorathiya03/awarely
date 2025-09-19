import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native"; // For a loading spinner
import "./global.css";

const AuthLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Wait until Clerk is loaded to check the auth state
    if (!isLoaded) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && !inAuthGroup) {
      // If the user is signed in and NOT in the (auth) group,
      // redirect them to the main app screen.
      router.replace("/(tabs)/home");
    } else if (!isSignedIn) {
      // If the user is not signed in, redirect them to the sign-in screen.
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn]);

  // Show a loading indicator while Clerk is loading
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render the currently active route
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>;
};

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <AuthLayout />
    </ClerkProvider>
  );
}