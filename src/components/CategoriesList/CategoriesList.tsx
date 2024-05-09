import React, { useEffect } from 'react'
import { Category } from '@/types/categoryType'
import CategoryItem from './CategoryItem'
import { View } from 'react-native'

type FilterCategoriesProps = {
  categories?: Category[]
  navigation: any
}

const CategoriesList: React.FunctionComponent<FilterCategoriesProps> = ({
  categories,
  navigation,
}) => {
  useEffect(() => {
    console.log('Categories:', categories)
  }, [categories]) // Log lại mỗi khi categories thay đổi

  if (!categories) {
    return null // Trả về null nếu categories không tồn tại
  }

  return (
    <View className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          navigation={navigation}
        />
      ))}
    </View>
  )
}

export default CategoriesList
