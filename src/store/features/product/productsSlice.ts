import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction"
import { Producto } from "@/interfaces/Producto"
import { Categoria } from "@/interfaces/Categoria"
import { Subcategoria } from "@/interfaces/Subcategoria"
import { Filters } from "@/interfaces/Filters"
import { getProducts, getProduct, getCategories, getSubcategories } from "@/services/products/productsService"

type Error = 'success' | 'error' | 'warning' | 'info'

enum OrderBy {
  'Precio ASC' = "1",
  'Precio DESC' = "2",
  'Nombre ASC' = "3",
  'Nombre DESC' = "4",
}

enum Precios {
  "Todos" = "0",
  "Entre 0 y 3000" = "1",
  "Entre 3000 y 5000" = "2",
  "Entre 5000 y 10000" = "3",
  "Más de 10000" = "4",
}

interface ProductsState {
  productos: Producto[],
  productosFiltered: Producto[],
  productosFilteredSearch: Producto[],
  search: string,
  order: string,
  precio: string,
  producto: Producto
  categorias: Categoria[],
  subcategorias: Subcategoria[],
  loading: boolean,
  error: {
    type: Error,
    message: string
  },
  categoriaSelectedURL?: string
  subcategoriaSelectedURL?: string
}

const INITIAL_STATE: ProductsState = {
  productos: [],
  productosFiltered: [],
  productosFilteredSearch: [],
  search: '',
  order: OrderBy['Precio ASC'],
  precio: Precios['Todos'],
  producto: {} as Producto,
  categorias: [],
  subcategorias: [],
  loading: false,
  error: {
    type: 'info',
    message: ''
  },
  categoriaSelectedURL: undefined,
  subcategoriaSelectedURL: undefined
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
    getProductStart: (state) => {
      state.loading = true
    },
    getProductSuccess: (state, action: PayloadAction<Producto>) => {
      state.producto = action.payload
      state.loading = false
    },
    getProductError: (state, action: PayloadAction<string>) => {
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
    },
    setCategoriaSelectedURL: (state, action: PayloadAction<string | undefined>) => {
      state.categoriaSelectedURL = action.payload
    },
    setSubcategoriaSelectedURL: (state, action: PayloadAction<string | undefined>) => {
      state.subcategoriaSelectedURL = action.payload
    },
    setProductsFiltered: (state, action: PayloadAction<Producto[]>) => {
      state.productosFiltered = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload
    },
    setPrecio: (state, action: PayloadAction<string>) => {
      state.precio = action.payload
    },
    filterProducts: (state) => {
      const { productos, search, order, precio } = state;
      let productosFiltered = [...productos];
    
      if (search) {
        const regex = new RegExp(search, 'i');
        productosFiltered = productosFiltered.filter(producto => regex.test(producto.nombre));
      }
    
      if (order) {
        switch (order) {
          case OrderBy['Precio ASC']:
            productosFiltered.sort((a, b) => a.precioVenta - b.precioVenta);
            break;
          case OrderBy['Precio DESC']:
            productosFiltered.sort((a, b) => b.precioVenta - a.precioVenta);
            break;
          case OrderBy['Nombre ASC']:
            productosFiltered.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
          case OrderBy['Nombre DESC']:
            productosFiltered.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
          default:
            break;
        }
      }
    
      if (precio) {
        productosFiltered = productosFiltered.filter(producto => {
          switch (precio) {
            case Precios['Todos']:
              return true;
            case Precios['Entre 0 y 3000']:
              return producto.precioVenta >= 0 && producto.precioVenta <= 3000;
            case Precios['Entre 3000 y 5000']:
              return producto.precioVenta >= 3000 && producto.precioVenta <= 5000;
            case Precios['Entre 5000 y 10000']:
              return producto.precioVenta >= 5000 && producto.precioVenta <= 10000;
            case Precios['Más de 10000']:
              return producto.precioVenta >= 10000;
            default:
              return true;
          }
        });
      }
    
      state.productosFiltered = productosFiltered;
    },
    clearFilters: (state) => {
      state.productosFiltered = state.productos;
      state.search = ''
      state.order = OrderBy['Precio ASC']
      state.precio = Precios['Todos']
    },
    setProductosFilteredSearch: (state, action: PayloadAction<Producto[]>) => {
      state.productosFilteredSearch = action.payload
    }
  }
})

export const { 
  getProductsStart, 
  getProductsSuccess, 
  getProductsError, 
  getProductStart,
  getProductSuccess,
  getProductError,
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesError,
  getSubcategoriesStart,
  getSubcategoriesSuccess,
  getSubcategoriesError,
  setCategoriaSelectedURL,
  setSubcategoriaSelectedURL,
  setProductsFiltered,
  setSearch,
  setOrder,
  setPrecio,
  filterProducts,
  clearFilters,
  setProductosFilteredSearch
} = productsSlice.actions
export default productsSlice.reducer

export const getProductsAsync = (filters: Filters) => async (dispatch: any) => {
  dispatch(getProductsStart())
  try {
    const products = await getProducts(filters)
    dispatch(getProductsSuccess(products))
  } catch (error: any) {
    dispatch(getProductsError(error.response.data.message))
  }
}

export const getProductAsync = (id: number) => async (dispatch: any) => {
  dispatch(getProductStart())
  try {
    const product = await getProduct(id)
    dispatch(getProductSuccess(product))
  } catch (error: any) {
    dispatch(getProductError(error.response.data.message))
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

export const getSubcategoriesAsync = (id: number) => async (dispatch: any) => {
  dispatch(getSubcategoriesStart())
  try {
    const subcategories = await getSubcategories(id)
    dispatch(getSubcategoriesSuccess(subcategories))
  } catch (error: any) {
    dispatch(getSubcategoriesError(error.response.data.message))
  }
}