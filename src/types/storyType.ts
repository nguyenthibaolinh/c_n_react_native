import { AuthorResponse } from './authorType'
import { Category } from './categoryType'
import { UserPublic } from './userType'

export interface StoriesResponse {
  id: number
  name: string
  slug: string
  AuthorId: number
  UserId: number
  access: number
  type: number
  avatar: string
  createdAt: string | Date
  descriptions: string
  followCount: number
  likeCount: number
  viewCount: number
  isFull: boolean
  lastChapter: {
    id: number
    number: number
  }
  updatedAt: string | Date
  User: UserPublic
  Categories: Category[]
}

export interface Story {
  id: number
  name: string
  slug: string
  isFull: boolean
  access: number
  descriptions: string
  avatar: string
  type: number
  viewCount: number
  likeCount: number
  followCount: number
  Author: AuthorResponse
  Categories: Category[]
  User: UserPublic
  UserId: number
  createdAt: string | Date
  updatedAt: string | Date
}

export interface StoriesPaginate {
  curPage: number
  perPage: number
  total: number
  data: StoriesResponse[]
}

export interface StoriesQuery {
  page: number
  perPage?: number
  type?: number
  isFull: boolean | null
  categoryIn: string
  categoryNotIn: string
  authorId?: number
  userId?: number
  order?: string
  key: string
}

export interface FollowStoriesQuery {
  page?: number
  perPage?: number
}

export interface StoryCreate {
  name: string
  descriptions: string
  avatar: string
  type: number
  AuthorId: number
  categories: number[]
}

export interface StoryHandleResponse {
  id: number
  name: string
  descriptions: string
  avatar: string
  type: number
  slug: string
  AuthorId: number
  categories: number[]
}
