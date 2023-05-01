import axios from '@/libs/axios'
import { Usuario } from '@/interfaces/Usuario'
import { Cart } from '@/interfaces/Cart'

interface CartAPI {
  productos: {
    id_producto: number;
    cantidad: number;
  }[];
}

export const getUser = async (id: string): Promise<Usuario> => {
  const { data } = await axios.get<Usuario>(`/users/${id}`)
  return data
}

export const updateUser = async (usuario: Usuario): Promise<Usuario> => {
  const { data } = await axios.put<Usuario>(`/users/${usuario.id}`, usuario)
  return data
}

export const getCart = async (): Promise<Cart> => {
  const { data } = await axios.get(`/users/cart`)
  return data
}

export const addToCart = async (cart: CartAPI): Promise<Cart> => {
  const { data } = await axios.post(`/users/cart`, cart)
  return data
}