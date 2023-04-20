import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { Producto } from "@/interfaces/Producto"

interface CartState {
  items: Producto[],
  total: number
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  } as CartState,
  reducers: {
    addToCart: (state, action: PayloadAction<Producto>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if(item) {
        if(item.cantidad) item.cantidad = action.payload.cantidad || 0
        item.subTotal = Number((item.precioVenta * (item.cantidad || 0)).toFixed(2))
      } else {
        state.items.push({
          ...action.payload,
          subTotal: Number((action.payload.precioVenta * (action.payload.cantidad || 0)).toFixed(2))
        })
      }
      state.total += Number((action.payload.precioVenta * (action.payload.cantidad || 0)).toFixed(2))
    }
  },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer