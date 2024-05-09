import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useLogging } from '../../hooks/useLogging'
import { IStackScreenProps } from '../../library/StackScreenProps'
import CategoriesList from '@/components/CategoriesList'
import { List, ListFilter, ListIcon, Search } from 'lucide-react-native'

const NotifyScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const [logging] = useLogging('Notify Screen')
  const { navigation } = props

  useEffect(() => {
    logging.info({ navigation })
  }, [logging])

  return (
    <View className="h-[100%] w-[100%] p-3 pt-12 gap-2 bg-white">
      <View className="flex-row">
        <Image
          className="w-[100px] h-[140px] rounded-[10] ml-1 mr-2 mt-3"
          source={{
            uri: 'https://cdn-4.ohay.tv/imgs/249e4499926e47ef867c/728.jpg',
          }}
          resizeMode="stretch"
        />
        <View className="flex-1">
          <Text className="text-[24px] font-bold mb-3">Tên truyện</Text>
          <Text className="text-[15px]">Loại {}</Text>
          <Text className="text-[15px]">Trạng thái {}</Text>
          <Text className="text-[15px]">Tác giả {}</Text>
          <Text className="text-[15px]">Lượt xem {}</Text>
          <Text className="text-[15px]">Lượt thích {}</Text>
          <Text className="text-[15px]">Lượt theo dõi {}</Text>
          <View className="flex-row">
            <Image
              className="w-[30px] h-[30px] rounded-[50] mt-1"
              source={{
                uri: 'https://cdn-4.ohay.tv/imgs/249e4499926e47ef867c/728.jpg',
              }}
              resizeMode="stretch"
            />
            <Text className="p-2 font-bold text-[15px]">Người đăng {}</Text>
          </View>
        </View>
      </View>
      {/* <CategoriesList/> */}
      <View className="flex-row gap-3 justify-center">
        <Text
          className="border w-[65px] h-[35px] bg-orange-500 rounded-[18] items-center pt-2 pl-4"
          onPress={() => navigation.navigate('Home')}
        >
          Thích
        </Text>
        <Text
          className="border w-[95px] h-[35px] bg-orange-500 rounded-[18] items-center pt-2 pl-4"
          onPress={() => navigation.navigate('Home')}
        >
          Đọc truyện
        </Text>
        <Text
          className="border w-[100px] h-[35px] bg-orange-500 rounded-[18] items-center pt-2 pl-4"
          onPress={() => navigation.navigate('Home')}
        >
          Theo dõi
        </Text>
      </View>
      <View className="flex-row">
        <Text className="text-[19px] font-bold mt-2">Giới thiệu truyện</Text>
        <View className="justify-end p-3">
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <List color="black" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-[100%] h-[1px] bg-black"></View>
      <Text className="text-[16px]">aaaaa{}</Text>
      {/* <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Personal"
        onPress={() => navigation.navigate('Personal')}
      /> */}
      <StatusBar style="auto" />
    </View>
  )
}

export default NotifyScreen
