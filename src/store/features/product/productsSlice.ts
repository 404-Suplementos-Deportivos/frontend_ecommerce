import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { Producto } from "@/interfaces/Producto"
import { Categoria } from "@/interfaces/Categoria"
import { Subcategoria } from "@/interfaces/Subcategoria"
import { getProducts, getCategories, getSubcategories } from "@/services/products/productsService"

type Error = 'success' | 'error' | 'warning' | 'info'

interface ProductsState {
  productos: Producto[],
  categorias: Categoria[],
  subcategorias: Subcategoria[],
  loading: boolean,
  error: {
    type: Error,
    message: string
  }
}

const INITIAL_STATE: ProductsState = {
  productos: [],
  categorias: [],
  subcategorias: [],
  loading: false,
  error: {
    type: 'info',
    message: ''
  }
}


export const productsSlice = createSlice({
  name: 'productos',
  initialState: INITIAL_STATE,
  reducers: {
    getProductsStart: (state) => {
      state.loading = true
    },
    getProductsSuccess: (state, action: PayloadAction<Producto[]>) => {
      state.productos = action.payload
      state.loading = false
    },
    getProductsError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = {
        type: 'error',
        message: action.payload
      }
    },
    getCategoriesStart: (state) => {
      state.loading = true
    },
    getCategoriesSuccess: (state, action: PayloadAction<Categoria[]>) => {
      state.categorias = action.payload
      state.loading = false
    },
    getCategoriesError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = {
        type: 'error',
        message: action.payload
      }
    },
    getSubcategoriesStart: (state) => {
      state.loading = true
    },
    getSubcategoriesSuccess: (state, action: PayloadAction<Subcategoria[]>) => {
      state.subcategorias = action.payload
      state.loading = false
    },
    getSubcategoriesError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = {
        type: 'error',
        message: action.payload
      }
    }
  }
})

export const { 
  getProductsStart, 
  getProductsSuccess, 
  getProductsError, 
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesError,
  getSubcategoriesStart,
  getSubcategoriesSuccess,
  getSubcategoriesError
} = productsSlice.actions
export default productsSlice.reducer

export const getProductsAsync = () => async (dispatch: any) => {
  dispatch(getProductsStart())
  try {
    const products = await getProducts()
    dispatch(getProductsSuccess(products))
  } catch (error: any) {
    dispatch(getProductsError(error.response.data.message))
  }
}

export const getCategoriesAsync = () => async (dispatch: any) => {
  dispatch(getCategoriesStart())
  try {
    const categories = await getCategories()
    dispatch(getCategoriesSuccess(categories))
  } catch (error: any) {
    dispatch(getCategoriesError(error.response.data.message))
  }
}

// subcategoriesAsync necesita de un id para getSubcategories
export const getSubcategoriesAsync = (id: number) => async (dispatch: any) => {
  dispatch(getSubcategoriesStart())
  try {
    const subcategories = await getSubcategories(id)
    dispatch(getSubcategoriesSuccess(subcategories))
  } catch (error: any) {
    dispatch(getSubcategoriesError(error.response.data.message))
  }
}