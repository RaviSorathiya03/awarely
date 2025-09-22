import { MotiView } from 'moti';
import React, { useState } from 'react';
import { LayoutRectangle, Text, TouchableOpacity, View } from 'react-native';

const TaskTab = () => {
    const filters = ["All", "Today", "Upcoming", "Completed"];
    const [active, setActive] = useState("All");
    // State to store the layout measurements of each tab
    const [layouts, setLayouts] = useState<Record<string, LayoutRectangle>>({});

    // This function runs when each tab is rendered, measuring its position and size
    const onTabLayout = (event: any, content: string) => {
        const { layout } = event.nativeEvent;
        setLayouts(prev => ({ ...prev, [content]: layout }));
    };

    // Get the layout of the currently active tab
    const activeLayout = layouts[active];

    return (
        // Main container with a subtle bottom border
        <View className="w-full flex-row relative border-b border-slate-200">
            {filters.map((content) => {
                const isActive = active === content;
                return (
                    <TouchableOpacity
                        key={content}
                        onPress={() => setActive(content)}
                        // Measure the layout of this tab
                        onLayout={(event) => onTabLayout(event, content)}
                        className="flex-1 items-center py-4"
                    >
                        <Text
                            className={`text-base font-semibold transition-colors duration-300 ${isActive ? 'text-indigo-500' : 'text-slate-400'}`}
                        >
                            {content}
                        </Text>
                    </TouchableOpacity>
                );
            })}

            {/* The animated indicator bar */}
            {/* It only renders after the active tab has been measured */}
            {activeLayout && (
                <MotiView
                    // Animate the position and width
                    animate={{
                        translateX: activeLayout.x,
                        width: activeLayout.width,
                    }}
                    transition={{
                        type: 'spring',
                        damping: 15,
                        stiffness: 120,
                    }}
                    // Styling for the indicator
                    className="h-1 bg-indigo-500 rounded-full absolute bottom-0"
                />
            )}
        </View>
    );
};

export default TaskTab;