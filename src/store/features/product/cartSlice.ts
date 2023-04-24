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
    setCart: (state) => {
      const cart = localStorage.getItem('cart')
      if(cart) {
        const cartState = JSON.parse(cart)
        state.items = cartState.items
        state.total = cartState.total
      }
    },
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
      state.total += Math.round((action.payload.precioVenta * (action.payload.cantidad || 0)) * 100) / 100
      setCartLocalStorage(state)
    },
    addQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      if(item && item.cantidad && item.stock > item.cantidad) {
        if(item.cantidad) item.cantidad += 1
        item.subTotal = Number((item.precioVenta * (item.cantidad || 0)).toFixed(2))
        state.total += Math.round((item?.precioVenta || 0) * 100) / 100
        setCartLocalStorage(state)        
      }
    },
    removeQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      if(item && item.cantidad && item.cantidad > 1) {
        if(item.cantidad) item.cantidad -= 1
        item.subTotal = Number((item.precioVenta * (item.cantidad || 0)).toFixed(2))
        state.total -= Math.round((item?.precioVenta || 0) * 100) / 100
        setCartLocalStorage(state)
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      if(item) {
        state.total -= Math.round((item?.precioVenta || 0) * (item?.cantidad || 0) * 100) / 100
        state.items = state.items.filter(item => item.id !== action.payload)
        setCartLocalStorage(state)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      localStorage.removeItem('cart')
    }
  },
})

export const { 
  setCart,
  addToCart,
  addQuantity,
  removeQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions
export default cartSlice.reducer

export const setCartLocalStorage = (cart: CartState) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}