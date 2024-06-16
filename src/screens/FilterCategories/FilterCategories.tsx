import { useAppDispatch, useAppSelector } from '@/app/hooks'
import StoryFilterBox from '@/components/HomePage/StoryFilterBox'
import {
  selectStoryFilter,
  updateStoryFilter,
} from '@/features/stories/storyFilterSlide'
import { IStackScreenProps } from '@/library/StackScreenProps'
import { Home } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { View, TextInput, FlatList, Text } from 'react-native'
import { Button } from 'react-native-paper'

const FilterCategoriesScreen: React.FunctionComponent<IStackScreenProps> = ({
  navigation,
}) => {
  const storyFilter = useAppSelector(selectStoryFilter)
  const [searchText, setSearchText] = useState(storyFilter.key)
  const dispatch = useAppDispatch()

  const handleSearch = () => {
    dispatch(
      updateStoryFilter({
        key: searchText,
      })
    )
    navigation.navigate('Home')
  }

  return (
    <View className="flex-1 p-[20px] bg-white items-center">
      <TextInput
        className="h-[40px] w-full border-gray-500 border-[1px] rounded-[20px] px-4 mb-4"
        placeholder="Tìm kiếm"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text)
        }}
      />
      <Button
        style={{ backgroundColor: '#FA8035' }}
        className="w-[130px]"
        onPress={handleSearch}
        mode="contained"
      >
        Tìm kiếm
      </Button>
      {/* <FlatList
        data={searchResults}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      {/* <StoryFilterBox /> */}
    </View>
  )
}

export default FilterCategoriesScreen
