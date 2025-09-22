"use client"

import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

type Task = {
  id: string
  title: string
  description?: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  completed: boolean
}

type TabType = "today" | "upcoming" | "completed" | "priority"

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review project proposal",
    description: "Go through the Q4 marketing strategy document",
    dueDate: new Date(),
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Team standup meeting",
    description: "Daily sync with development team",
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Add new API endpoints to developer docs",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    priority: "low",
    completed: false,
  },
  {
    id: "4",
    title: "Code review",
    description: "Review pull requests from team members",
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    priority: "high",
    completed: true,
  },
]

export default function TasksScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("today")
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const getFilteredTasks = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)

    switch (activeTab) {
      case "today":
        return tasks.filter((task) => {
          const taskDate = new Date(task.dueDate.getFullYear(), task.dueDate.getMonth(), task.dueDate.getDate())
          return !task.completed && taskDate.getTime() === today.getTime()
        })
      case "upcoming":
        return tasks.filter((task) => {
          const taskDate = new Date(task.dueDate.getFullYear(), task.dueDate.getMonth(), task.dueDate.getDate())
          return !task.completed && taskDate.getTime() >= tomorrow.getTime()
        })
      case "completed":
        return tasks.filter((task) => task.completed)
      case "priority":
        return tasks.filter((task) => !task.completed && task.priority === "high")
      default:
        return tasks
    }
  }

  const getPendingTaskCount = () => {
    return tasks.filter((task) => !task.completed).length
  }

  const getDueDateColor = (dueDate: Date, completed: boolean) => {
    if (completed) return { bg: "#dcfce7", text: "#166534" }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const taskDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())

    if (taskDate.getTime() < today.getTime()) return { bg: "#fef2f2", text: "#991b1b" }
    if (taskDate.getTime() === today.getTime()) return { bg: "#fefce8", text: "#a16207" }
    return { bg: "#eff6ff", text: "#1e40af" }
  }

  const formatDueDate = (dueDate: Date) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    const taskDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())

    if (taskDate.getTime() < today.getTime()) return "Overdue"
    if (taskDate.getTime() === today.getTime()) return "Today"
    if (taskDate.getTime() === tomorrow.getTime()) return "Tomorrow"
    return dueDate.toLocaleDateString()
  }

  const filteredTasks = getFilteredTasks()

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-6 py-4 pt-12">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Text className="text-2xl font-bold text-slate-900">Tasks</Text>
            <View className="bg-teal-100 px-3 py-1 rounded-full">
              <Text className="text-teal-800 text-sm font-medium">{getPendingTaskCount()} pending</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="p-2">
              <Ionicons name="search" size={20} color="#64748b" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <Ionicons name="filter" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="bg-white border-b border-slate-200 px-6 py-3">
        <View className="bg-slate-100 rounded-xl p-1 flex-row">
          {[
            { key: "today", label: "Today" },
            { key: "upcoming", label: "Upcoming" },
            { key: "completed", label: "Completed" },
            { key: "priority", label: "Priority" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key as TabType)}
              className={`flex-1 px-4 py-2 rounded-lg ${activeTab === tab.key ? "bg-white shadow-sm" : ""}`}
            >
              <Text
                className={`text-sm font-medium text-center ${
                  activeTab === tab.key ? "text-teal-700" : "text-slate-600"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Task List */}
      <ScrollView className="flex-1 px-6 py-4">
        {filteredTasks.length === 0 ? (
          // Empty State
          <View className="flex-1 items-center justify-center py-16">
            <View className="w-24 h-24 bg-slate-200 rounded-full items-center justify-center mb-6">
              <Ionicons name="calendar-outline" size={48} color="#94a3b8" />
            </View>
            <Text className="text-lg font-semibold text-slate-900 mb-2">No tasks yet</Text>
            <Text className="text-slate-600 mb-6 text-center max-w-sm">
              Add one to stay on track and boost your productivity!
            </Text>
            <TouchableOpacity className="bg-teal-600 px-6 py-3 rounded-xl flex-row items-center">
              <Ionicons name="add" size={16} color="white" />
              <Text className="text-white font-medium ml-2">Add Your First Task</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-3 pb-20">
            {filteredTasks.map((task) => (
              <View key={task.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <View className="flex-row items-start gap-3">
                  <TouchableOpacity
                    onPress={() => toggleTaskComplete(task.id)}
                    className={`w-5 h-5 rounded border-2 mt-1 items-center justify-center ${
                      task.completed ? "bg-teal-600 border-teal-600" : "border-slate-300"
                    }`}
                  >
                    {task.completed && <Ionicons name="checkmark" size={12} color="white" />}
                  </TouchableOpacity>
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between gap-3">
                      <View className="flex-1">
                        <Text
                          className={`font-semibold text-slate-900 ${
                            task.completed ? "line-through text-slate-500" : ""
                          }`}
                        >
                          {task.title}
                        </Text>
                        {task.description && (
                          <Text className={`text-sm mt-1 ${task.completed ? "text-slate-400" : "text-slate-600"}`}>
                            {task.description}
                          </Text>
                        )}
                      </View>
                      {task.priority === "high" && !task.completed && (
                        <Ionicons name="flame" size={16} color="#ef4444" />
                      )}
                    </View>
                    <View className="flex-row items-center gap-2 mt-3">
                      <View
                        className="px-2 py-1 rounded"
                        style={{ backgroundColor: getDueDateColor(task.dueDate, task.completed).bg }}
                      >
                        <Text
                          className="text-xs font-medium"
                          style={{ color: getDueDateColor(task.dueDate, task.completed).text }}
                        >
                          {formatDueDate(task.dueDate)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity className="w-14 h-14 bg-teal-600 rounded-full items-center justify-center shadow-lg">
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
