import React, { FC, useEffect, useState } from 'react'
import { View, Image, ScrollView, FlatList, Dimensions } from 'react-native'
import { ChapterImageUploadResponse } from '@/types/fileUploadType'

type ChapterContentImageProp = {
  content: string
}

const ChapterContentImage: FC<ChapterContentImageProp> = ({ content }) => {
  const [imagesList, setImagesList] = useState<ChapterImageUploadResponse[]>([])
  const win = Dimensions.get('window')
  const ratio = win.width / 541
  useEffect(() => {
    const imagesParse: ChapterImageUploadResponse[] = JSON.parse(content)
    imagesParse.sort((image1, image2) => image1.index - image2.index)

    setImagesList(imagesParse)
  }, [content])

  return (
    <FlatList
      data={imagesList}
      renderItem={({ item }) => (
        <Image
          src={item.url}
          className="flex-1 w-full h-[600px]"
          style={{ resizeMode: 'stretch' }}
        />
      )}
      keyExtractor={(item) => item.index.toString()}
    ></FlatList>
  )
}

export default ChapterContentImage
