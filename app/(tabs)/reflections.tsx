import { Ionicons } from "@expo/vector-icons"
import { useRef, useState } from "react"
import { Animated, Dimensions, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const { width } = Dimensions.get("window")

interface ReflectionData {
  date: string
  mood: number
  energy: number
  mainGoal: boolean
  topTask: boolean
  notes: string
}

export default function ReflectionsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [mood, setMood] = useState(3)
  const [energy, setEnergy] = useState(3)
  const [mainGoal, setMainGoal] = useState(false)
  const [topTask, setTopTask] = useState(false)
  const [notes, setNotes] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const saveAnimation = useRef(new Animated.Value(0)).current
  const confirmationAnimation = useRef(new Animated.Value(0)).current

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const getMoodEmoji = (value: number) => {
    const emojis = ["😞", "😕", "😐", "🙂", "😃"]
    return emojis[value - 1] || "😐"
  }

  const getMoodColor = (value: number) => {
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"]
    return colors[value - 1] || "#6b7280"
  }

  const getEnergyColor = (value: number) => {
    const colors = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#f97316"]
    return colors[value - 1] || "#6b7280"
  }

  const handleSaveReflection = async () => {
    setIsSaving(true)

    // Simulate save animation
    Animated.sequence([
      Animated.timing(saveAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(confirmationAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(confirmationAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(saveAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsSaving(false)
    })

    // Here you would save to your backend/storage
    const reflection: ReflectionData = {
      date: selectedDate.toISOString(),
      mood,
      energy,
      mainGoal,
      topTask,
      notes,
    }

    console.log("Saving reflection:", reflection)
  }

  const renderSlider = (
    value: number,
    setValue: (value: number) => void,
    label: string,
    getColor: (value: number) => string,
    showEmoji?: boolean,
  ) => (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-slate-700 font-medium text-base">{label}</Text>
        {showEmoji && <Text className="text-2xl">{getMoodEmoji(value)}</Text>}
      </View>

      <View className="relative">
        <View className="h-2 bg-slate-200 rounded-full">
          {/* <View
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(value / 5) * 100}%`,
              backgroundColor: getColor(value),
            }}
          /> */}
        </View>

        <View className="flex-row justify-between mt-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              onPress={() => setValue(num)}
              className={`w-8 h-8 rounded-full border-2 items-center justify-center ${
                value === num ? "border-slate-400" : "border-slate-200"
              }`}
              style={{ backgroundColor: value === num ? getColor(value) : "transparent" }}
            >
              <Text className={`text-xs font-medium ${value === num ? "text-white" : "text-slate-400"}`}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )

  const renderToggle = (value: boolean, setValue: (value: boolean) => void, label: string, encouragement: string) => (
    <View className="flex-row items-center justify-between py-4 px-4 bg-white rounded-2xl mb-3 shadow-sm">
      <View className="flex-1">
        <Text className="text-slate-700 font-medium text-base mb-1">{label}</Text>
        {value && <Text className="text-emerald-600 text-sm font-medium">{encouragement}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={setValue}
        trackColor={{ false: "#e2e8f0", true: "#10b981" }}
        thumbColor={value ? "#ffffff" : "#f1f5f9"}
      />
    </View>
  )

  const hasReflection = mood !== 3 || energy !== 3 || mainGoal || topTask || notes.length > 0

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-4 bg-white border-b border-slate-100">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-slate-800 mb-1">Daily Reflection</Text>
              <Text className="text-slate-500 text-sm">{formatDate(selectedDate)}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="w-12 h-12 bg-lavender-100 rounded-full items-center justify-center"
            >
              <Ionicons name="calendar" size={20} color="#8b5cf6" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 py-6">
          {!hasReflection ? (
            /* Empty State */
            <View className="items-center py-12">
              <View className="w-24 h-24 bg-emerald-100 rounded-full items-center justify-center mb-6">
                <Ionicons name="leaf" size={32} color="#10b981" />
              </View>
              <Text className="text-xl font-semibold text-slate-700 mb-2 text-center">Take 2 minutes to reflect</Text>
              <Text className="text-slate-500 text-center leading-relaxed">It helps you grow 🌱</Text>
            </View>
          ) : null}

          {/* Mood & Energy Section */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-slate-800 mb-6">How are you feeling?</Text>

            {renderSlider(mood, setMood, "Mood", getMoodColor, true)}
            {renderSlider(energy, setEnergy, "Energy Level", getEnergyColor)}
          </View>

          {/* Goal Check-in */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-slate-800 mb-4 px-2">Goal Check-in</Text>

            {renderToggle(mainGoal, setMainGoal, "Worked on my main goal today?", "Great job! 🎯")}

            {renderToggle(topTask, setTopTask, "Completed my top task?", "Amazing progress! ✨")}
          </View>

          {/* Notes Section */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-slate-800">Notes</Text>
              <TouchableOpacity className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center">
                <Ionicons name="mic" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>

            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Write about your day…"
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={6}
              className="text-slate-700 text-base leading-relaxed font-serif"
              style={{
                minHeight: 120,
                textAlignVertical: "top",
                fontFamily: "serif",
              }}
            />
          </View>

          {/* Insights Summary */}
          {hasReflection && (
            <View className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-6 mb-6">
              <Text className="text-lg font-semibold text-slate-800 mb-4">This Week's Insights</Text>

              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-purple-600">4.2</Text>
                  <Text className="text-slate-600 text-sm">Avg Mood</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-blue-600">3.8</Text>
                  <Text className="text-slate-600 text-sm">Avg Energy</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-emerald-600">5</Text>
                  <Text className="text-slate-600 text-sm">Day Streak</Text>
                </View>
              </View>

              <View className="h-2 bg-white rounded-full overflow-hidden">
                <View className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full w-4/5" />
              </View>
              <Text className="text-slate-600 text-sm mt-2">Productivity Score: 80%</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Save Button */}
      <View className="px-6 py-4 bg-white border-t border-slate-100">
        <TouchableOpacity
          onPress={handleSaveReflection}
          disabled={isSaving}
          className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl py-4 items-center shadow-lg"
        >
          <Animated.View
            style={{
              opacity: saveAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            <Text className="text-white font-semibold text-lg">Save Reflection</Text>
          </Animated.View>

          <Animated.View
            style={{
              position: "absolute",
              opacity: confirmationAnimation,
              transform: [
                {
                  scale: confirmationAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={24} color="white" />
              <Text className="text-white font-semibold text-lg ml-2">Saved!</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
