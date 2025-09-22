import { FontAwesome } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import React, { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

// Define the props the component will accept
type DeepWorkCardProps = {
  title?: string;
  description?: string;
  time?: string;
  delay?: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

const DeepWorkCard = ({
  title = "Deep work session",
  description = "Focus on project Alpha",
  time = "Today • 09:30 – 11:30",
  delay = 0,
  onEdit = () => console.log('Edit pressed'),
  onDelete = () => console.log('Delete pressed'),
}: DeepWorkCardProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50, scale: 0.9 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'timing', duration: 700, delay: delay }}
      className="w-full"
    >
      <Pressable>
        {({ pressed }) => (
          <MotiView
            animate={{ scale: pressed ? 0.97 : 1 }}
            transition={{ type: 'spring', duration: 300 }}
            className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100"
          >
            {/* Header */}
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <FontAwesome name="check" size={18} className="text-indigo-500" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-slate-800">{title}</Text>
                  <Text className="text-slate-500 mt-1">{description}</Text>
                </View>
              </View>
              {/* Wrap the icon in a TouchableOpacity to handle press */}
              <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} className="p-2">
                <FontAwesome name="ellipsis-h" size={18} className="text-slate-400" />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="flex-row items-center bg-slate-50 rounded-full px-3 py-1 self-start mt-2">
              <FontAwesome name="clock-o" size={14} className="text-slate-500" />
              <Text className="text-sm font-medium text-slate-600 ml-2">{time}</Text>
            </View>

            {/* Animated Edit/Delete Menu */}
            <AnimatePresence>
              {menuVisible && (
                <MotiView
                  from={{ opacity: 0, scale: 0.8, translateY: -10 }}
                  animate={{ opacity: 1, scale: 1, translateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, translateY: -10 }}
                  transition={{ type: 'timing', duration: 150 }}
                  // Position the menu absolutely relative to the card
                  className="absolute top-12 right-5 bg-white rounded-lg shadow-xl border border-slate-100 w-32"
                >
                  {/* Edit Button */}
                  <TouchableOpacity
                    onPress={() => { onEdit(); setMenuVisible(false); }}
                    className="flex-row items-center p-3"
                  >
                    <FontAwesome name="pencil" size={14} className="text-slate-600" />
                    <Text className="text-slate-700 font-medium ml-3">Edit</Text>
                  </TouchableOpacity>

                  {/* Delete Button */}
                  <TouchableOpacity
                    onPress={() => { onDelete(); setMenuVisible(false); }}
                    className="flex-row items-center p-3 border-t border-slate-100"
                  >
                    <FontAwesome name="trash" size={14} className="text-red-500" />
                    <Text className="text-red-500 font-medium ml-3">Delete</Text>
                  </TouchableOpacity>
                </MotiView>
              )}
            </AnimatePresence>
          </MotiView>
        )}
      </Pressable>
    </MotiView>
  );
};

export default DeepWorkCard;