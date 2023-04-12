import axios from '@/libs/axios'
import { Usuario } from '@/interfaces/Usuario'

export const getUser = async (id: string): Promise<Usuario> => {
  const { data } = await axios.get<Usuario>(`/users/${id}`)
  return data
}

export const updateUser = async (usuario: Usuario): Promise<Usuario> => {
  const { data } = await axios.put<Usuario>(`/users/${usuario.id}`, usuario)
  return data
}