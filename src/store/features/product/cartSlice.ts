import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { Producto } from "@/interfaces/Producto"
import { Cart } from "@/interfaces/Cart"
import { getCart, addToCart as addToCartAPI } from "@/services/users/usersService"
import { showToast } from "../design/designSlice"
import { RootState } from "@/store/store"

type Error = 'success' | 'error' | 'warning' | 'info'

interface CartState {
  items: Producto[],
  total: number,
  loading?: boolean,
  error?: {
    type: Error,
    message: string
  },
}

interface CartAPI {
  productos: {
    id_producto: number;
    cantidad: number;
  }[];
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: {
      type: 'info',
      message: ''
    },
  } as CartState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      const cart = action.payload
      if(cart.items) {
        state.items = cart.items
        state.items.map(item => {
          item.subTotal = Number((item.precioVenta * (item.cantidad || 0)).toFixed(2))
        })
        state.total = cart.items.reduce((total, item) => total + (item.subTotal || 0), 0)
      } else {
        state.items = []
        state.total = 0
      }
    },
    addToCart: (state, action: PayloadAction<{product: Producto, isAuth: boolean}>) => {
      const item = state.items.find(item => item.id === action.payload.product.id)
      if(item) {
        if(item.cantidad) item.cantidad = action.payload.product.cantidad || 0
        item.subTotal = Number((item.precioVenta * (item.cantidad || 0)).toFixed(2))
      } else {
        state.items.push({
          ...action.payload.product,
          subTotal: Number((action.payload.product.precioVenta * (action.payload.product.cantidad || 0)).toFixed(2))
        })
      }
      state.total += Math.round((action.payload.product.precioVenta * (action.payload.product.cantidad || 0)) * 100) / 100
      
      const isAuth = action.payload.isAuth
      if(isAuth) {
        try {
          const cartAPI: CartAPI = {
            productos: state.items.map(item => ({
              id_producto: item.id || 0,
              cantidad: item.cantidad || 0
            }))
          }
          addToCartAPI(cartAPI)
        } catch (error) {
          console.log(error)
        }
      } else {
        setCartLocalStorage(state)
      }
    },
    addQuantity: (state, action: PayloadAction<{idProducto: number, isAuth: boolean}>) => {
      const item = state.items.find(item => item.id === action.payload.idProducto)
      if(item && item.cantidad && item.stock > item.cantidad) {
        if(item.cantidad) item.cantidad += 1
        item.subTotal = Number((item.precioVenta * (item.cantidad || 0)).toFixed(2))
        state.total += Math.round((item?.precioVenta || 0) * 100) / 100
        
        const isAuth = action.payload.isAuth
        if(isAuth) {
          try {
            const cartAPI: CartAPI = {
              productos: state.items.map(item => ({
                id_producto: item.id || 0,
                cantidad: item.cantidad || 0
              }))
            }
            addToCartAPI(cartAPI)
          } catch (error) {
            console.log(error)
          }
        } else {
          setCartLocalStorage(state)
        }
      }
    },
    removeQuantity: (state, action: PayloadAction<{idProducto: number, isAuth: boolean}>) => {
      const item = state.items.find(item => item.id === action.payload.idProducto)
      if(item && item.cantidad && item.cantidad > 1) {
        if(item.cantidad) item.cantidad -= 1
        item.subTotal = Number((item.precioVenta * (item.cantidad || 0)).toFixed(2))
        state.total -= Math.round((item?.precioVenta || 0) * 100) / 100
        
        const isAuth = action.payload.isAuth
        if(isAuth) {
          try {
            const cartAPI: CartAPI = {
              productos: state.items.map(item => ({
                id_producto: item.id || 0,
                cantidad: item.cantidad || 0
              }))
            }
            addToCartAPI(cartAPI)
          } catch (error) {
            console.log(error)
          }
        } else {
          setCartLocalStorage(state)
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<{idProducto: number, isAuth: boolean}>) => {
      const item = state.items.find(item => item.id === action.payload.idProducto)
      if(item) {
        state.total -= Math.round((item?.precioVenta || 0) * (item?.cantidad || 0) * 100) / 100
        state.items = state.items.filter(item => item.id !== action.payload.idProducto)
        
        const isAuth = action.payload.isAuth
        if(isAuth) {
          try {
            const cartAPI: CartAPI = {
              productos: state.items.map(item => ({
                id_producto: item.id || 0,
                cantidad: item.cantidad || 0
              }))
            }
            addToCartAPI(cartAPI)
          } catch (error) {
            console.log(error)
          }
        } else {
          setCartLocalStorage(state)
        }
      }
    },
    clearCart: (state, action: PayloadAction<{isAuth: boolean}>) => {
      state.items = []
      state.total = 0
      
      const isAuth = action.payload.isAuth
      if(isAuth) {
        try {
          const cartAPI: CartAPI = {
            productos: []
          }
          addToCartAPI(cartAPI)
        } catch (error) {
          console.log(error)
        }
      } else {
        setCartLocalStorage(state)
      }
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

export const getCartData = (authenticated: boolean) => async (dispatch: any) => {
  if(authenticated) {
    try {
      const cart = await getCart()
      dispatch(setCart({
        items: cart.productos,
        total: cart.productos.reduce((acc, item) => acc + (item.precioVenta + (item?.cantidad || 0)), 0)
      }))
    } catch (error: any) {
      dispatch(showToast({
        type: 'error',
        message: error.response.data.message
      }))
    }
  } else {
    const cart = localStorage.getItem('cart')
    if(cart) {
      const cartParsed = JSON.parse(cart)
      dispatch(setCart(cartParsed))
    } else {
      dispatch(clearCart({isAuth: false}))
    }
  }
}

export const cleanCart = () => (dispatch: any) => {
  dispatch(clearCart({isAuth: true}))
}

export const setCartLocalStorage = (cart: CartState) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}