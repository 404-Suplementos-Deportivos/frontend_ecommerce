import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { Producto } from "@/interfaces/Producto"

interface ProductState {
  productos: Producto[]
}

const INITIAL_STATE: ProductState = {
  productos: []
}


export const productSlice = createSlice({
  name: 'producto',
  initialState: INITIAL_STATE,
  reducers: {
    
  }
})

export const {  } = productSlice.actions
export default productSlice.reducer