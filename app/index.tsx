process.env.EXPO_ROUTER_APP_ROOT = "./app"; // 👈 force expo-router to use ./app folder

import { SignOutButton } from "@/components/ui/SignOutButton";
import { Protect } from "@clerk/clerk-expo";
import "expo-router/entry";
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
   <Protect fallback={<Text>Users that are signed-out can see this.</Text>}>
    <SafeAreaView>
        <Text>Users that are signed-in can see this.</Text>
      <SignOutButton />
    </SafeAreaView>
    </Protect>
  )
}

export default App