import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import SearchScreen from '@/screens/Search/Search'
import FilterCategoriesScreen from '@/screens/FilterCategories/FilterCategories'
import StoryScreen from '@/screens/Story/Story'
import ChapterListScreen from '@/screens/ChapterList/ChapterList'
import ChapterScreen from '@/screens/Chapter/Chapter'
import AuthNavigator from './AuthNavigator'

const MainNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'Tìm kiếm' }}
      />
      <Stack.Screen
        name="FilterCategories"
        component={FilterCategoriesScreen}
        options={{ title: 'Lọc truyện' }}
      />
      <Stack.Screen
        name="Story"
        component={StoryScreen}
        options={{ title: 'Chi tiết truyện' }}
      />
      <Stack.Screen
        name="ChapterList"
        component={ChapterListScreen}
        options={{ title: 'Danh sách chương' }}
      />
      <Stack.Screen
        name="Chapter"
        component={ChapterScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  )
}
export default MainNavigator
