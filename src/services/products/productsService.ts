import axios from '@/libs/axios'
import { Producto } from '@/interfaces/Producto'
import { Categoria } from '@/interfaces/Categoria'
import { Subcategoria } from '@/interfaces/Subcategoria'
import { Filters } from '@/interfaces/Filters'

export const getProducts = async (filters: Filters): Promise<Producto[]> => {
  const { data } = await axios.get('/products', { params: filters })
  const products = data.map((product: Producto) => {
    const { precioLista, ...rest } = product
    return rest
  })
  return products
}

export const getProduct = async (id: number): Promise<Producto> => {
  const { data } = await axios.get(`/products/${id}`)
  const { precioLista, ...rest } = data
  return rest as Producto
}

export const getCategories = async (): Promise<Categoria[]> => {
  const { data } = await axios.get('/products/categories')
  return data
}

export const getSubcategories = async (id: number): Promise<Subcategoria[]> => {
  const { data } = await axios.get(`/products/subcategories/${id}`)
  return data
}