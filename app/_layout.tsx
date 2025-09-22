import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "./global.css";

// This key is essential for Clerk to work correctly.
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const InitialLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // Wait until Clerk is loaded before performing any navigation actions
        if (!isLoaded) {
            return;
        }

        const inTabsGroup = segments[0] === "(tabs)";

        if (isSignedIn && !inTabsGroup) {
            // User is signed in and not in the main app.
            // Redirect them to the main screen.
            router.replace("/(tabs)/tasks");
        } else if (!isSignedIn) {
            // User is not signed in.
            // Redirect them to the sign-in screen.
            router.replace("/sign-in");
        }
    }, [isLoaded, isSignedIn]);

    // The Stack navigator is ALWAYS rendered. This provides the
    // navigation context to the entire app, preventing the error.
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ presentation: 'modal', title: 'Log In or Sign Up' }} />
            {/* Add other auth screens like sign-up here if needed */}
        </Stack>
    );
};

export default function RootLayout() {
    return (
        <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY}
            tokenCache={tokenCache}
        >
            <InitialLayout />
        </ClerkProvider>
    );
}