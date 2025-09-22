import DeepWorkCard from '@/components/tasks/Task';
import TaskTab from '@/components/tasks/TaskTab';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

// Sample data for a more realistic and dynamic list
const tasksData = [
  {
    title: "Finalize Q3 Report",
    description: "Compile and review all data",
    time: "Today • 10:00 – 12:00",
  },
  {
    title: "Design Sprint",
    description: "Brainstorm new UI concepts",
    time: "Today • 14:00 – 17:00",
  },
  {
    title: "Code Review",
    description: "Review PRs for the new feature",
    time: "Tomorrow • 09:00 – 10:00",
  },
  {
    title: "Client Follow-up",
    description: "Call back about project status",
    time: "Tomorrow • 11:30 – 12:00",
  },
];

const TasksScreen = () => {
  return (
    // SafeAreaView ensures content avoids notches and status bars
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Section */}
      <View className="px-6 pt-8 pb-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-bold text-slate-800">Tasks</Text>
          <FontAwesome name="info-circle" size={24} color="#94a3b8" />
        </View>
      </View>

      {/* Tab Bar Section */}
      <View className="px-6 mb-6">
        <TaskTab />
      </View>

      {/* Scrollable Task List */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <View className="space-y-4">
          {tasksData.map((task, index) => (
            <DeepWorkCard
              key={index}
              title={task.title}
              description={task.description}
              time={task.time}
              delay={index * 100} // Creates a staggered animation effect
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TasksScreen;