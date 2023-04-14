import axios from '@/libs/axios'
import { Producto } from '@/interfaces/Producto'

export const getProducts = async (): Promise<Producto[]> => {
  const { data } = await axios.get('/products')
  return data
}