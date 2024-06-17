import { RootState } from '@/app/store'
import { FollowStoriesQuery } from '@/types/storyType'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: FollowStoriesQuery = {
  page: 1,
  perPage: 10,
}

export const storyFavoriteFilterSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    updateStoryFavoriteFilter: (state, actions: PayloadAction<any>) => {
      return { ...state, ...actions.payload }
    },
  },
})

export const { updateStoryFavoriteFilter } = storyFavoriteFilterSlice.actions

export const selectStoryFavoriteFilter = (state: RootState) =>
  state.storyFavoriteFilter

const storyFavoriteFilterReducer = storyFavoriteFilterSlice.reducer
export default storyFavoriteFilterReducer
