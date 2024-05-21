import ChapterSortEnum from '@/constants/chapters/ChapterSortEnum'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'

export interface ChapterQuery {
  storySlug: string
  storyId: string
  order: ChapterSortEnum
}

export interface ChaptersResponse {
  id: number
  number: number
  name: string
  isFree: boolean
  privateEnd: null | Date
  price: null | number
  access: number
  type: StoryTypeEnum
  StoryId: number
  seen: boolean
}

export interface ChapterResponse {
  id: number
  number: number
  name: string
  isFree: boolean
  privateEnd: null | Date
  price: null | number
  access: number
  type: StoryTypeEnum
  StoryId: number
  content: string
}

export interface ChapterCreate {
  name?: string
  number: number
  isFree: boolean
  price?: number
  privateEnd?: Date
  type: StoryTypeEnum
  StoryId: number
  content: string
}
