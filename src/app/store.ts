import authReducer from '@/features/auth/authSlice'
import creatorStoryFilterReducer from '@/features/stories/creator/storyFilterSlide'
import storyFavoriteFilterReducer from '@/features/stories/storyFavoriteFilterSlide'
import storyFilterReducer from '@/features/stories/storyFilterSlide'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    storyFilter: storyFilterReducer,
    storyFavoriteFilter: storyFavoriteFilterReducer,
    creatorStoryFilter: creatorStoryFilterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
