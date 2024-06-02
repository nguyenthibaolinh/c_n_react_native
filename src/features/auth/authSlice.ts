import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthType } from '@/types/authType'
import { RootState } from '@/app/store'

// Define a type for the slice state
type AuthState = {
  isInitialized: boolean
  isAuthenticated: boolean
  user: AuthType
}

// Define the initial state using that type
const initialState: AuthState = {
  isInitialized: true,
  isAuthenticated: false,
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    avatar: null,
    gender: 0,
    permissions: '',
    accountBalance: 0,
  },
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateAuth: (
      state,
      actions: PayloadAction<Omit<AuthState, 'isInitialized'>>
    ) => {
      const { isAuthenticated, ...payload } = actions.payload
      state.isInitialized = true
      state.isAuthenticated = isAuthenticated
      state.user = payload.user
    },
    resetAuth: () => {
      return initialState
    },
    initAuth: (state) => {
      state.isInitialized = true
    },
    updateBalanceUser: (state, actions: PayloadAction<number>) => {
      state.user.accountBalance = actions.payload
    },
  },
})

export const { updateAuth, resetAuth, initAuth, updateBalanceUser } =
  authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth

const authReducer = authSlice.reducer
export default authReducer
