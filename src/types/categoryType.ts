export interface Category {
  id: number
  name: string
  slug: string
}

export type ValueCategoryStatus = 0 | 1 | -1

export interface CategoriesStatus {
  id: number
  status: ValueCategoryStatus
  name: string
}
