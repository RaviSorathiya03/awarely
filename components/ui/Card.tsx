import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Switch, Text, View } from 'react-native'

const Card = ({isChecked, todo}:{
    isChecked: boolean,
    todo: string
}) => {
    const [checked, setIsChecked] = useState<boolean>(false);
  return (
    <View className='flex-row justify-between items-center mt-2 p-5 w-full h-[60px] bg-rose-50 rounded-3xl'>
        <View className='flex-row items-center gap-2'>
            <View>
                 <Switch
                    value={isChecked}
                    onValueChange={setIsChecked}
                    trackColor={{ false: "#e5e7eb", true: "#22c55e" }} // Tailwind's slate-200 & green-500
                    thumbColor={isChecked ? "#ffffff" : "#f1f5f9"}
                />
            </View>
            <View>
                <Text>{todo}</Text>
            </View>
        </View>
        <View>
            <FontAwesome name='arrow-right' size={20}/>
        </View>
    </View>
  )
}

export default Card