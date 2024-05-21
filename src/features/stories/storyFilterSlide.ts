import { RootState } from '@/app/store'
import StoryTypeEnum from '@/constants/stories/StoryTypeEnum'
import { StoriesQuery } from '@/types/storyType'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: StoriesQuery = {
  page: 1,
  type: StoryTypeEnum.WORD,
  key: '',
  order: 'update',
  categoryIn: '',
  categoryNotIn: '',
}

export const storyFilterSlice = createSlice({
  name: 'stories',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateStoryFilter: (state, actions: PayloadAction<any>) => {
      return { ...state, ...actions.payload }
    },
  },
})

export const { updateStoryFilter } = storyFilterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectStoryFilter = (state: RootState) => state.storyFilter

const storyFilterReducer = storyFilterSlice.reducer
export default storyFilterReducer
