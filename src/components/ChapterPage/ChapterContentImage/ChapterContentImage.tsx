import React, { FC, useEffect, useState } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { ChapterImageUploadResponse } from '@/types/fileUploadType'

type ChapterContentImageProp = {
  content: string
}

const ChapterContentImage: FC<ChapterContentImageProp> = ({ content }) => {
  const [imagesList, setImagesList] = useState<ChapterImageUploadResponse[]>([])

  useEffect(() => {
    const imagesParse: ChapterImageUploadResponse[] = JSON.parse(content)
    imagesParse.sort((image1, image2) => image1.index - image2.index)

    setImagesList(imagesParse)
  }, [content])

  return (
    <ScrollView>
      {imagesList.map((image) => (
        <Image
          key={image.index}
          source={{ uri: image.url }}
          className="w-auto max-w-full min-h-10"
        />
      ))}
    </ScrollView>
  )
}

export default ChapterContentImage
