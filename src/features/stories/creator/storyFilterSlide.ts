import { RootState } from '@/app/store'
import { StoriesQuery } from '@/types/storyType'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState: StoriesQuery = {
  page: 1,
  key: '',
  isFull: null,
  order: 'all',
  categoryIn: '',
  categoryNotIn: '',
  perPage: 10,
}

export const creatorstoryFilterSlice = createSlice({
  name: 'creatorStories',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCreatorStoryFilter: (state, actions: PayloadAction<any>) => {
      return { ...state, ...actions.payload }
    },
  },
})

export const { updateCreatorStoryFilter } = creatorstoryFilterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCreatorStoryFilter = (state: RootState) =>
  state.creatorStoryFilter

const creatorStoryFilterReducer = creatorstoryFilterSlice.reducer
export default creatorStoryFilterReducer
