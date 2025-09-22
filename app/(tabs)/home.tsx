import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"

interface Task {
  id: number
  title: string
  completed: boolean
}

interface ProgressItem {
  label: string
  progress: number
  color: string
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Study React", completed: true },
    { id: 2, title: "Workout", completed: false },
    { id: 3, title: "Journal", completed: false },
    { id: 4, title: "Read Book", completed: true },
    { id: 5, title: "Meditate", completed: true },
  ])

  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const progressData: ProgressItem[] = [
    { label: "Goals", progress: 60, color: "#ec4899" },
    { label: "Habits", progress: 80, color: "#be123c" },
  ]

  const moods = [
    { emoji: "😃", label: "Great" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😐", label: "Okay" },
    { emoji: "😔", label: "Low" },
  ]

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const completedTasks = tasks.filter((task) => task.completed).length

  return (
    <SafeAreaView className="flex-1 bg-rose-50 mt-[10%]">
      <StatusBar barStyle="dark-content" backgroundColor="#fdf2f8" />
      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-rose-700 mb-2">Good Morning, Ravi 🌅</Text>
          <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <Text className="text-slate-600 text-center italic leading-relaxed">
              "Discipline is choosing between what you want now and what you want most."
            </Text>
          </View>
        </View>

        {/* Today's Tasks */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-slate-800">✅ TODAY'S TASKS</Text>
            <Text className="text-sm text-slate-500">
              ({completedTasks}/{tasks.length} completed)
            </Text>
          </View>

          <View className="space-y-3">
            {tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                onPress={() => toggleTask(task.id)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row items-center"
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                    task.completed ? "bg-rose-600 border-rose-600" : "border-slate-400"
                  }`}
                >
                  {task.completed && <Ionicons name="checkmark" size={14} color="white" />}
                </View>
                <Text className={`flex-1 ${task.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>
                  {task.title}
                </Text>
                <Text className={`text-sm ${task.completed ? "text-rose-600" : "text-slate-500"}`}>
                  {task.completed ? "Done" : "Pending"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Progress Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-slate-800 mb-4">📊 PROGRESS</Text>

          <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            {progressData.map((item, index) => (
              <View key={index}>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-slate-800 font-medium">{item.label}</Text>
                  <Text className="text-slate-800 font-bold">{item.progress}%</Text>
                </View>
                <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${item.progress}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Mood Tracking */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-slate-800 mb-4">📝 How are you feeling today?</Text>

          <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center mb-4">
              {moods.map((mood, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedMood(mood.label)}
                  className={`w-16 h-16 rounded-2xl items-center justify-center ${
                    selectedMood === mood.label ? "bg-rose-600" : "bg-gray-100"
                  }`}
                >
                  <Text className="text-2xl">{mood.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity className="bg-gray-100 p-4 rounded-xl">
              <Text className="text-slate-500 text-center">[Add Note...]</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <View className="mb-8">
          <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center mb-4">
              <View className="items-center">
                <Text className="text-2xl">🔥</Text>
                <Text className="text-slate-800 font-bold text-lg">5 days</Text>
                <Text className="text-slate-500 text-sm">Streak</Text>
              </View>

              <TouchableOpacity className="bg-rose-600 px-6 py-3 rounded-xl">
                <Text className="text-white font-medium">📅 See Full Report →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom padding for FAB */}
        <View className="h-20" />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-8 right-6 w-16 h-16 bg-rose-600 rounded-full items-center justify-center shadow-lg"
        style={{
          shadowColor: "#be123c",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
