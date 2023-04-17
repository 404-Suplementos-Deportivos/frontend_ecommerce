import axios from '@/libs/axios'
import { Producto } from '@/interfaces/Producto'
import { Categoria } from '@/interfaces/Categoria'
import { Subcategoria } from '@/interfaces/Subcategoria'

export const getProducts = async (): Promise<Producto[]> => {
  const { data } = await axios.get('/products')
  // retornar cada producto pero sin precioLista
  const products = data.map((product: Producto) => {
    const { precioLista, ...rest } = product
    return rest
  })
  return products
}

export const getCategories = async (): Promise<Categoria[]> => {
  const { data } = await axios.get('/products/categories')
  return data
}

export const getSubcategories = async (id: number): Promise<Subcategoria[]> => {
  const { data } = await axios.get(`/products/subcategories/${id}`)
  return data
}