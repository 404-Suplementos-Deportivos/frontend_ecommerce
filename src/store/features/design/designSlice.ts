import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"

interface DesignState {
  isNavbarToggled: boolean
  isCartToggled: boolean
  isModalLoginVisible: boolean
}

const INITIAL_STATE: DesignState = {
  isNavbarToggled: false,
  isCartToggled: false,
  isModalLoginVisible: false
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
    }
  }
})

export const { toggleNavbar, toggleCart, toggleModalLogin } = designSlice.actions
export default designSlice.reducer