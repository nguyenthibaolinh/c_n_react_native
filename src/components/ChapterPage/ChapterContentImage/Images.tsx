import { ChapterImageUploadResponse } from '@/types/fileUploadType'
import { FC } from 'react'
import {
  LazyLoadImage,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'

type ImagesProp = {
  images: ChapterImageUploadResponse[]
  scrollPosition: ScrollPosition
}

const Images: FC<ImagesProp> = ({ images, scrollPosition }) => (
  <div>
    {images.map((image) => (
      <div key={image.index} className="flex justify-center">
        <LazyLoadImage
          className="w-auto max-w-full min-h-10"
          src={image.url}
          alt={`index ${image.index}`}
          scrollPosition={scrollPosition}
        />
      </div>
    ))}
  </div>
)

export default trackWindowScroll(Images)
