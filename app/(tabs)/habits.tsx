"use client"

import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Alert, Modal, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type HabitFrequency = "daily" | "weekly" | "custom"
type ViewType = "today" | "week" | "all" | "streaks"

interface Habit {
  id: string
  name: string
  description?: string
  frequency: HabitFrequency
  weeklyTarget?: number
  completedToday: boolean
  currentStreak: number
  longestStreak: number
  weeklyProgress: number
  reminderEnabled: boolean
  reminderTime?: string
}

export default function HabitsScreen() {
  const [activeView, setActiveView] = useState<ViewType>("today")
  const [showAddModal, setShowAddModal] = useState(false)
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Morning Meditation",
      description: "10 minutes of mindfulness",
      frequency: "daily",
      completedToday: true,
      currentStreak: 7,
      longestStreak: 15,
      weeklyProgress: 85,
      reminderEnabled: true,
      reminderTime: "07:00",
    },
    {
      id: "2",
      name: "Read 30 Pages",
      description: "Daily reading habit",
      frequency: "daily",
      completedToday: false,
      currentStreak: 3,
      longestStreak: 12,
      weeklyProgress: 60,
      reminderEnabled: true,
      reminderTime: "20:00",
    },
    {
      id: "3",
      name: "Exercise",
      description: "Workout or walk",
      frequency: "weekly",
      weeklyTarget: 4,
      completedToday: true,
      currentStreak: 2,
      longestStreak: 8,
      weeklyProgress: 75,
      reminderEnabled: false,
    },
  ])

  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    frequency: "daily" as HabitFrequency,
    weeklyTarget: 3,
    reminderEnabled: false,
    reminderTime: "09:00",
  })

  const currentStreak = Math.max(...habits.map((h) => h.currentStreak), 0)

  const toggleHabitCompletion = (habitId: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === habitId) {
          const newCompleted = !habit.completedToday
          return {
            ...habit,
            completedToday: newCompleted,
            currentStreak: newCompleted ? habit.currentStreak + 1 : Math.max(0, habit.currentStreak - 1),
            weeklyProgress: Math.min(100, habit.weeklyProgress + (newCompleted ? 15 : -15)),
          }
        }
        return habit
      }),
    )
  }

  const addNewHabit = () => {
    if (!newHabit.name.trim()) {
      Alert.alert("Error", "Please enter a habit name")
      return
    }

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      description: newHabit.description,
      frequency: newHabit.frequency,
      weeklyTarget: newHabit.weeklyTarget,
      completedToday: false,
      currentStreak: 0,
      longestStreak: 0,
      weeklyProgress: 0,
      reminderEnabled: newHabit.reminderEnabled,
      reminderTime: newHabit.reminderTime,
    }

    setHabits((prev) => [...prev, habit])
    setNewHabit({
      name: "",
      description: "",
      frequency: "daily",
      weeklyTarget: 3,
      reminderEnabled: false,
      reminderTime: "09:00",
    })
    setShowAddModal(false)
  }

  const getFilteredHabits = () => {
    switch (activeView) {
      case "today":
        return habits.filter((h) => h.frequency === "daily" || !h.completedToday)
      case "week":
        return habits
      case "streaks":
        return habits.filter((h) => h.currentStreak > 0).sort((a, b) => b.currentStreak - a.currentStreak)
      default:
        return habits
    }
  }

  const renderHabitCard = (habit: Habit) => (
    <View key={habit.id} className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <TouchableOpacity
              onPress={() => toggleHabitCompletion(habit.id)}
              className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                habit.completedToday ? "bg-emerald-500 border-emerald-500" : "border-gray-300"
              }`}
            >
              {habit.completedToday && <Ionicons name="checkmark" size={16} color="white" />}
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">{habit.name}</Text>
              {habit.description && <Text className="text-gray-500 text-sm mt-1">{habit.description}</Text>}
            </View>
          </View>

          {/* Progress Bar */}
          <View className="ml-9 mb-2">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-xs text-gray-500">Weekly Progress</Text>
              <Text className="text-xs text-gray-500">{habit.weeklyProgress}%</Text>
            </View>
            <View className="h-2 bg-gray-200 rounded-full">
              <View
                className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                style={{ width: `${habit.weeklyProgress}%` }}
              />
            </View>
          </View>

          {/* Streak Info */}
          <View className="ml-9 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-orange-500 text-sm font-medium">🔥 {habit.currentStreak}-day streak</Text>
            </View>
            <Text className="text-xs text-gray-400">Best: {habit.longestStreak} days</Text>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-gray-900 mr-3">Habits</Text>
            <View className="flex-row items-center bg-orange-100 px-2 py-1 rounded-full">
              <Text className="text-orange-600 text-sm font-medium">🔥 {currentStreak}</Text>
            </View>
          </View>
          <TouchableOpacity className="p-2">
            <Ionicons name="settings-outline" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Motivational Banner */}
      <View className="mx-6 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <Text className="text-blue-800 font-medium text-center">"Consistency beats intensity 💪"</Text>
      </View>

      {/* View Tabs */}
      <View className="px-6 mt-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {[
            { key: "today", label: "Today" },
            { key: "week", label: "This Week" },
            { key: "all", label: "All Habits" },
            { key: "streaks", label: "Streaks" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveView(tab.key as ViewType)}
              className={`px-4 py-2 rounded-full mr-3 ${
                activeView === tab.key ? "bg-rose-600" : "bg-white border border-gray-200"
              }`}
            >
              <Text className={`font-medium ${activeView === tab.key ? "text-white" : "text-gray-600"}`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Habits List */}
      <ScrollView className="flex-1 px-6">
        {getFilteredHabits().length > 0 ? (
          getFilteredHabits().map(renderHabitCard)
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-6xl mb-4">🌱</Text>
            <Text className="text-xl font-semibold text-gray-900 mb-2">Start building habits that stick!</Text>
            <Text className="text-gray-500 text-center mb-6">
              Create your first habit and begin your journey to a better you.
            </Text>
            <TouchableOpacity onPress={() => setShowAddModal(true)} className="bg-rose-600 px-6 py-3 rounded-full">
              <Text className="text-white font-semibold">+ Create Habit</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      {getFilteredHabits().length > 0 && (
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          className="absolute bottom-6 right-6 w-14 h-14 bg-rose-600 rounded-full items-center justify-center shadow-lg"
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      )}

      {/* Add Habit Modal */}
      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-white">
          <View className="px-6 py-4 border-b border-gray-100">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text className="text-rose-600 font-medium">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-lg font-semibold text-gray-900">New Habit</Text>
              <TouchableOpacity onPress={addNewHabit}>
                <Text className="text-rose-600 font-medium">Save</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="flex-1 px-6 py-6">
            {/* Habit Name */}
            <View className="mb-6">
              <Text className="text-gray-900 font-medium mb-2">Habit Name</Text>
              <TextInput
                value={newHabit.name}
                onChangeText={(text) => setNewHabit((prev) => ({ ...prev, name: text }))}
                placeholder="e.g., Morning Meditation"
                className="border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
              />
            </View>

            {/* Description */}
            <View className="mb-6">
              <Text className="text-gray-900 font-medium mb-2">Description (Optional)</Text>
              <TextInput
                value={newHabit.description}
                onChangeText={(text) => setNewHabit((prev) => ({ ...prev, description: text }))}
                placeholder="Brief description of your habit"
                className="border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Frequency */}
            <View className="mb-6">
              <Text className="text-gray-900 font-medium mb-3">Frequency</Text>
              <View className="flex-row">
                {[
                  { key: "daily", label: "Daily" },
                  { key: "weekly", label: "Weekly" },
                  { key: "custom", label: "Custom" },
                ].map((freq) => (
                  <TouchableOpacity
                    key={freq.key}
                    onPress={() => setNewHabit((prev) => ({ ...prev, frequency: freq.key as HabitFrequency }))}
                    className={`flex-1 py-3 rounded-xl mr-2 ${
                      newHabit.frequency === freq.key ? "bg-rose-600" : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-center font-medium ${
                        newHabit.frequency === freq.key ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {freq.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Weekly Target (if weekly) */}
            {newHabit.frequency === "weekly" && (
              <View className="mb-6">
                <Text className="text-gray-900 font-medium mb-2">Times per week</Text>
                <TextInput
                  value={newHabit.weeklyTarget.toString()}
                  onChangeText={(text) =>
                    setNewHabit((prev) => ({ ...prev, weeklyTarget: Number.parseInt(text) || 1 }))
                  }
                  placeholder="3"
                  keyboardType="numeric"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                />
              </View>
            )}

            {/* Reminder */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-900 font-medium">Reminder</Text>
                <Switch
                  value={newHabit.reminderEnabled}
                  onValueChange={(value) => setNewHabit((prev) => ({ ...prev, reminderEnabled: value }))}
                  trackColor={{ false: "#e5e5e5", true: "#be123c" }}
                  thumbColor="#ffffff"
                />
              </View>
              {newHabit.reminderEnabled && (
                <TextInput
                  value={newHabit.reminderTime}
                  onChangeText={(text) => setNewHabit((prev) => ({ ...prev, reminderTime: text }))}
                  placeholder="09:00"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                />
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}
