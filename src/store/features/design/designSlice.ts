import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { toast } from 'react-toastify';

interface DesignState {
  isNavbarToggled: boolean
  isCartToggled: boolean
  isModalLoginVisible: boolean
  toast: {
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  }
}

const INITIAL_STATE: DesignState = {
  isNavbarToggled: false,
  isCartToggled: false,
  isModalLoginVisible: false,
  toast: {
    message: '',
    type: 'info'
  }
}


export const designSlice = createSlice({
  name: 'design',
  initialState: INITIAL_STATE,
  reducers: {
    toggleNavbar: (state, action: PayloadAction<boolean>) => {
      state.isNavbarToggled = action.payload
    },
    toggleCart: (state, action: PayloadAction<boolean>) => {
      state.isCartToggled = action.payload
    },
    toggleModalLogin: (state, action: PayloadAction<boolean>) => {
      state.isModalLoginVisible = action.payload
    },
    showToast: (state, action: PayloadAction<{ message: string, type: 'success' | 'error' | 'info' | 'warning' }>) => {
      const { message, type } = action.payload
      state.toast = { message, type }
      toast[type](message)
    }
  }
})

export const { toggleNavbar, toggleCart, toggleModalLogin, showToast } = designSlice.actions
export default designSlice.reducer