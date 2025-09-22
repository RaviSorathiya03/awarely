import React from 'react'
import { Text, View } from 'react-native'

const Tags = ({color, habit}:{
    color: string, 
    habit: string
}) => {
  return (
    <View className='flex-row items-center gap-2 mt-2 w-28 p-2 rounded-3xl bg-rose-50'>
        <View className='w-4 h-4 rounded-[50%]'
        style ={{backgroundColor: color}}
        ></View>
        <Text>{habit}</Text>
    </View>
  )
}

export default Tags