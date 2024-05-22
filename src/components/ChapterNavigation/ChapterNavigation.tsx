import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { ArrowLeft, ArrowRight } from 'lucide-react-native'

const ChapterNavigation = () => {
  return (
    <View className="flex-row justify-between items-center p-4 bg-white border-t border-gray-200">
      <TouchableOpacity onPress={} className="p-4">
        <ArrowLeft size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={} className="p-4">
        <ArrowRight size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default ChapterNavigation
