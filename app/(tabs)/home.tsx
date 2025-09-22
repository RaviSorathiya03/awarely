import Card from '@/components/ui/Card';
import Tags from '@/components/ui/Tags';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { AnimatedCircularProgress } from "react-native-circular-progress";

const Home = () => {
  // const {user} = useUser();
  const [progress, setProgress] = useState(50);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <View className='px-7 w-screen h-screen py-14 bg-white/20  flex-col gap-8 items-stretch'>
     <View className='flex-row justify-between items-center'>
       <View>
        <Text className='text-2xl font-bold'>Good Morning</Text>
        <Text className='text-slate-400'>You're off to a great start</Text>
       </View>
       <View>
        <FontAwesome name='user' size={20}/>
       </View>
     </View>
    <View className='w-[400px] h-[500px] p-5 rounded-3xl bg-white shadow shadow-black'>
       <View className="flex items-center justify-center">
      <AnimatedCircularProgress
        size={170}
        width={12}
        fill={progress}
        tintColor="green"
        backgroundColor="#e5e7eb" // Tailwind's slate-200
        rotation={0}
        lineCap="butt"
      >
        {() => (
          <View className="items-center">
            <Text className="text-3xl font-bold text-gray-900">{progress}%</Text>
            <Text className="text-sm text-gray-500">Of Daily Task</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    
    </View>
     <View className='flex-row justify-between px-5 mt-5'>
      <Text className='text-lg font-semibold'>Today's Tasks Preview</Text>
      <Text className='text-green-400'>See all</Text>
     </View>
     <View className='flex-col gap-2'>
      <Card isChecked={isChecked}  todo='Plan daily'/>
      <Card isChecked={true} todo='Deep Work Session' />
       <Card isChecked={true} todo='Coding session' />
     </View>
    </View>
     <View className='w-[400px] h-[200px] p-5 rounded-3xl bg-white shadow shadow-black'>
      <View className=''>
        <View className='flex-row justify-between items-center p-1'>
          <Text className='text-lg font-semibold'>Habit Tracker</Text>
          <Text className='text-green-400'>View</Text>
        </View>
        <View className='flex-row gap-3 flex-wrap'>
          <Tags color='#D2C1B6' habit='Hydrate'/>
          <Tags color='#D2C1B6' habit='Hydrate'/>
          <Tags color='#D2C1B6' habit='Hydrate'/>
        </View>
      </View>
     </View>
     <View>
      <Text className='text-center text-xl font-extralight'>"One step at a time towards your goal"</Text>
     </View>
    </View>
  )
}


export default Home