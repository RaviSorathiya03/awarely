import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: "#be123c",
        tabBarInactiveTintColor: "#475569",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#e5e5e5",
        },
      }} >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
       <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
        }} />
        <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
        }} />
        <Tabs.Screen 
            name='reflections'
            options ={{
                title: 'Reflections',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
                
            }}
        />
          <Tabs.Screen
        name="settings"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
