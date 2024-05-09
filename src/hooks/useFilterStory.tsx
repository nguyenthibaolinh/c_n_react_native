import { StoriesQuery } from '@/types/storyType'
import { useNavigate } from 'react-router-dom'
import { omitBy } from 'lodash'

const isEmptyValue = (value: any) => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  if (typeof value === 'object' && Object.keys(value).length === 0) return true
  return false
}

export default function useFilterStory() {
  const navigate = useNavigate()

  return (storyFilter: StoriesQuery) => {
    const filteredOptions = omitBy(storyFilter, isEmptyValue)
    navigate(
      `?${Object.keys(filteredOptions)
        .map(
          (filterKey, index, arr) =>
            `${filterKey}=${filteredOptions[filterKey]}${
              index < arr.length - 1 ? '&' : ''
            }`
        )
        .join('')}`,
      {
        replace: true,
      }
    )
  }
}
