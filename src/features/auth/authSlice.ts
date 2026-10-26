
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string | number
  name: string
  surname: string
  email: string
  cellNumber: string
}

interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
}

function getSavedUser(): User | null {
  try {
    const savedUser = localStorage.getItem('pantryUser')
    return savedUser ? JSON.parse(savedUser) as User : null
  } catch {
    return null
  }
}

const savedUser = getSavedUser()

const initialState: AuthState = {
  currentUser: savedUser,
  isAuthenticated: savedUser !== null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
      localStorage.setItem('pantryUser', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      localStorage.removeItem('pantryUser')
    },
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
